"use client";

import {Link} from "../navigation";
import Image from "next/image";
import { urlFor } from "../../lib/image";
import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";

export default function NewsCarousel({
  news,
  locale: forcedLocale,
  title,
}: {
  news: any[];
  locale?: "pt" | "en";
  title?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const locale = forcedLocale ?? useLocale();

  const scroll = (offset: number) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full mb-8">
      {title ? (
        <div className="flex items-center justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold">{title}</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll(-300)}
              className="p-2 bg-gray-200 text-black hover:bg-[#DE0F19] hover:text-white flex-shrink-0 hover:cursor-pointer"
              aria-label="Scroll left"
            >
              &#8592;
            </button>
            <button
              onClick={() => scroll(300)}
              className="p-2 bg-gray-200 text-black hover:bg-[#DE0F19] hover:text-white flex-shrink-0 hover:cursor-pointer"
              aria-label="Scroll right"
            >
              &#8594;
            </button>
          </div>
        </div>
      ) : null}
      <div
        ref={containerRef}
        className="flex gap-8 overflow-x-auto pb-4"
        style={{ minWidth: 0 }}
      >
        {news.map((item: any) => (
          <Link
            key={item._id}
            href={`/news/${item.slug?.current ?? item._id}`}
            locale={locale}
            className="group block flex-shrink-0 w-80 min-w-80"
          >
            <div className="flex flex-col gap-4 p-6 hover:shadow-lg transition-shadow group-hover:bg-[#DE0F19] group-hover:text-white">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>{item.category}</span>
              </div>
              {item.image && (
                <div className="w-full h-56 overflow-hidden">
                  <Image
                    src={urlFor(item.image).width(300).height(250).url()}
                    alt={item.title}
                    width={300}
                    height={250}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <h2 className="text-lg font-semibold group-hover:underline line-clamp-2">
                {item.title}
              </h2>
              {item.body && (
                <p className="text-sm text-gray-600 line-clamp-2 group-hover:text-white">
                  {item.body
                    .map((block: any) => {
                      if (block?._type !== "block" || !Array.isArray(block.children)) {
                        return "";
                      }
                      return block.children.map((c: any) => c.text).join("");
                    })
                    .filter(Boolean)
                    .join(" ")}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
