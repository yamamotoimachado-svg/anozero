import imageUrlBuilder from "@sanity/image-url"
import { client } from "../src/sanity/client"
import { SanityImageSource, createImageUrlBuilder } from "@sanity/image-url"

// Cria o builder usando createImageUrlBuilder
const builder = createImageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}