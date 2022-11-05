import Image from "next/legacy/image";
import { urlFor } from "../lib/sanity";

const myLoader = ({ src }: { src: string }) => {
  return src;
};

interface Props {
  _ref: string;
  title: string;
  categories: Array<any>;
  author: string;
  _createdAt: string;
}

const Post = ({ _ref, _createdAt, title, categories, author }: Props) => {
  return (
    <div className="overflow-hidden rounded-lg bg-white text-black cursor-pointer">
      <div className="relative h-60">
        <Image
          loader={myLoader}
          src={urlFor(_ref).url()}
          blurDataURL={urlFor(_ref).quality(40).blur(300).url()}
          alt="#"
          layout="fill"
          quality={50}
        />
      </div>
      <div className="p-2">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <ul className="flex gap-x-2 text-sm opacity-70">
          {categories.map((category, index) => (
            <li>
              {`${category.title} ${
                index < categories.length - 1 ? " / " : ""
              }`}
            </li>
          ))}
        </ul>
        <h3 className="font-medium">By: &nbsp;{author}</h3>
        <span className="text-xs">
          Posted: {new Date(_createdAt).toDateString()}
        </span>
      </div>
    </div>
  );
};

export default Post;
