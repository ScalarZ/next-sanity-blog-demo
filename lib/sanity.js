import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";
import { config } from "./config";

const builder = imageUrlBuilder(config);

export const urlFor = (source) => {
  return builder.image(source);
};
export const client = createClient(config);
