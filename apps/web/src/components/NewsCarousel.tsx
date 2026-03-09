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
              className="group p-2 shrink-0 hover:cursor-pointer"
              aria-label="Scroll left"
            >
              <svg
                viewBox="0 0 45.23 38.57"
                aria-hidden="true"
                className="h-4 w-4 -scale-x-100 text-black transition-colors group-hover:text-[#DE0F19]"
                fill="currentColor"
              >
                <path d="M45.23,18.4v1.77l-19.52,18.4h-8.55l17.75-16.51H0v-5.54h34.91L17.16,0h8.55l19.52,18.4Z" />
              </svg>
            </button>
            <button
              onClick={() => scroll(300)}
              className="group p-2 shrink-0 hover:cursor-pointer"
              aria-label="Scroll right"
            >
              <svg
                viewBox="0 0 45.23 38.57"
                aria-hidden="true"
                className="h-4 w-4 text-black transition-colors group-hover:text-[#DE0F19]"
                fill="currentColor"
              >
                <path d="M45.23,18.4v1.77l-19.52,18.4h-8.55l17.75-16.51H0v-5.54h34.91L17.16,0h8.55l19.52,18.4Z" />
              </svg>
            </button>
          </div>
        </div>
      ) : null}
      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto pb-4"
        style={{ minWidth: 0 }}
      >
        {news.map((item: any) => (
          <Link
            key={item._id}
            href={`/news/${item.slug?.current ?? item._id}`}
            locale={locale}
            className="group block shrink-0 w-64 min-w-64 sm:w-80 sm:min-w-80"
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
