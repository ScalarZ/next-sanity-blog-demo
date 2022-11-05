import type { GetStaticProps, NextPage } from "next";
import { client } from "../lib/sanity";
import Post from "../components/Post";
import Link from "next/link";

interface Props {
  posts: Array<any>;
}

const Home = ({ posts }: Props) => {
  console.log(posts);
  return (
    <div className="p-4 min-h-screen bg-gray-900 text-white">
      <main className="mx-auto max-w-7xl">
        <h1 className="py-6 text-center text-red-500 font-bold text-4xl">
          Welcome To Next-Sanity Blog
        </h1>
        <ul className="mt-4 grid grid-cols-3 gap-x-10 gap-y-12
        max-lg:grid-cols-2 max-lg:gap-x-10
        max-sm:grid-cols-1 max-sm:px-10">
          {posts.map((post) => (
            <Link href={`post/${post?.slug.current}`} key={post._id}>
              <Post
                title={post?.title}
                _ref={post?.mainImage.asset._ref}
                author={post?.author.name}
                categories={post?.categories}
                _createdAt={post?._createdAt}
              />
            </Link>
          ))}
        </ul>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const query = `*[_type == "post"]
  {
    _id,
    _createdAt,
    title,
    slug{current},
    mainImage{
     asset{_ref}
    },
    author->{
      name
    },
    categories[]->{title}
  }`;
  const posts = (await client.fetch(query)) as Array<any>;
  return {
    props: {
      posts,
    },
  };
};
export default Home;
