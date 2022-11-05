import Image from "next/legacy/image";
import { PortableText } from "@portabletext/react";

const myLoader = ({ src }: { src: string }) => {
  return src;
};

const client = createClient({
  projectId: "dhs8i92d",
  dataset: "production",
  apiVersion: "2022-11-04",
  useCdn: false,
});

interface Props {
  post: any;
}

const Blog = ({ post }: Props) => {
  console.log(post);
  return (
    <div className="p-4 min-h-screen bg-gray-900 text-white">
      <header className="relative h-56">
        <Image
          loader={myLoader}
          src={urlFor(post?.mainImage.asset._ref).url()}
          blurDataURL={urlFor(post?.mainImage.asset._ref).blur(10).url()}
          alt="#"
          layout="fill"
          objectFit="cover"
        />
      </header>
      <h1 className="mt-6 mb-2 text-red-500 font-bold text-4xl">
        {post?.title}
      </h1>
      <ul className="mb-6 flex gap-x-2 text-sm opacity-70">
        <li>
          <b>Category:</b>
        </li>
        {post?.categories.map((category: any) => (
          <li>{category.title}</li>
        ))}
      </ul>
      <main>
        <PortableText value={post.body} />
      </main>
      <footer className="mt-6 text-xl text-green-400">
        <span className="flex items-center">
          <span className="mr-2 flex justify-center items-center rounded-full border-2 border-green-400">
            <Image
              loader={myLoader}
              src={urlFor(post?.author.image.asset._ref).url()}
              alt="#"
              height={50}
              width={50}
              objectFit="cover"
              className="rounded-full"
            />
          </span>
          Author: &nbsp; <b>{post?.author.name}</b>
        </span>
      </footer>
    </div>
  );
};

import { GetStaticPaths, GetStaticProps } from "next";
import { createClient } from "next-sanity";
import { urlFor } from "../../lib/sanity";

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = (await client.fetch(
    `*[_type == "post"]{slug{current}}`
  )) as Array<any>;
  const paths = slugs.map(({ slug }) => ({ params: { id: slug.current } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = (await client.fetch(
    `*[_type == "post" && slug.current == "${params?.id}"]{
        title,
        body,
        mainImage{
         asset{_ref}
        },
        author->{
          name,
          image{
            asset{_ref}
           },
        },
        categories[]->{title}
      }`
  )) as Array<any>;

  if (!post[0]) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      post: post[0],
    },
    revalidate: 1,
  };
};
export default Blog;
