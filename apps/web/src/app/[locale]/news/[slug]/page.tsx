import {client} from "../../../../sanity/client";
import {urlFor} from "../../../../../lib/image";
import {PortableText} from "@portabletext/react";
import Image from "next/image";
import {notFound} from "next/navigation";
import {Children} from "react";
import {LocaleSwitcherProvider} from "../../../../components/LocaleSwitcherContext";
import NewsMenu from "../../../../components/NewsMenu";

type PageProps = {
  params: {
    slug: string;
    locale: string;
  };
};

const portableTextComponents = {
  types: {
    image: ({value}: any) => {
      if (!value?.asset) return null;

      const caption = value.caption as string | undefined;

      return (
        <figure className="my-8">
          <Image
            src={urlFor(value).width(1200).url()}
            alt={caption || ""}
            width={1200}
            height={800}
            className="mb-2"
          />
          {caption ? (
            <figcaption className="text-sm text-gray-500">{caption}</figcaption>
          ) : null}
        </figure>
      );
    },
  },
  block: {
    h1: ({children}: any) => (
      <h1 className="text-3xl font-bold mt-2 mb-4">{children}</h1>
    ),
    h2: ({children}: any) => (
      <h2 className="text-2xl font-bold mt-5 mb-3">{children}</h2>
    ),
    h3: ({children}: any) => (
      <h3 className="text-xl font-bold mt-4 mb-2">{children}</h3>
    ),
    h4: ({children}: any) => (
      <h4 className="text-lg font-bold mt-3 mb-2">{children}</h4>
    ),
    normal: ({children}: any) => {
      const hasContent = Children.toArray(children).some((child) => {
        if (typeof child === "string") {
          return child.trim().length > 0;
        }
        return true;
      });

      return (
        <p className="text-base leading-relaxed mb-4">
          {hasContent ? children : "\u00A0"}
        </p>
      );
    },
  },
};

async function getPostWithTranslation(slug?: string) {
  if (!slug) return null;

  return client.fetch(
    `*[_type == "news" && (slug.current == $slug || translation->slug.current == $slug)]
      | order((slug.current == $slug) desc)[0]{
      _id,
      title,
      category,
      "slug": slug.current,
      image,
      body,
      language,
      translation->{
        _id,
        title,
        category,
        "slug": slug.current,
        image,
        body,
        language
      }
    }`,
    {slug}
  );
}

export default async function NewsPage({params}: PageProps) {
  const {slug, locale} = await params;
  const base = await getPostWithTranslation(slug);

  if (!base) return notFound();

  const post =
    base.language === locale
      ? base
      : base.translation?.language === locale
        ? base.translation
        : null;

  if (!post) return notFound();

  const translations = {
    pt:
      base.language === "pt"
        ? base.slug
        : base.translation?.language === "pt"
          ? base.translation.slug
          : undefined,
    en:
      base.language === "en"
        ? base.slug
        : base.translation?.language === "en"
          ? base.translation.slug
          : undefined,
  };

  return (
    <LocaleSwitcherProvider translations={translations}>
      <>
        <NewsMenu />
        <main className="max-w-3xl mx-auto px-6 pt-24 pb-20">
          <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

          {post.image && (
            <figure className="mb-10">
              <Image
                src={urlFor(post.image).width(1200).url()}
                alt={post.image.caption || post.title}
                width={1200}
                height={800}
                className="rounded-xl mb-2"
              />
              {post.image.caption ? (
                <figcaption className="text-sm text-gray-500">
                  {post.image.caption}
                </figcaption>
              ) : null}
            </figure>
          )}

            <div className="news-body">
            <PortableText value={post.body} components={portableTextComponents} />
          </div>
        </main>
      </>
    </LocaleSwitcherProvider>
  );
}
