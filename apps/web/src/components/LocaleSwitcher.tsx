"use client";

import {Link} from "../navigation";
import {usePathname} from "next/navigation";
import {useLocaleSwitcherContext} from "./LocaleSwitcherContext";

type LocaleSwitcherProps = {
  variant?: "carousel" | "news";
};

export default function LocaleSwitcher({variant = "carousel"}: LocaleSwitcherProps) {
  const pathname = usePathname();
  const {translations} = useLocaleSwitcherContext();

  const switchTo = (nextLocale: "pt" | "en") => {
    const translationSlug = translations?.[nextLocale];
    if (translationSlug && pathname?.includes("/news/")) {
      return `/news/${translationSlug}`;
    }

    const normalized = (pathname || "/").replace(/^\/(pt|en)(\/|$)/, "/");
    return normalized === "" ? "/" : normalized;
  };

  const isPortuguese = (pathname || "/").startsWith("/pt");

  const activeClass =
    variant === "news"
      ? "text-black"
      : "text-white text-[clamp(16px,1.8vw,22px)]";
  const inactiveClass =
    variant === "news"
      ? "text-gray-400 hover:text-gray-600"
      : "text-white/40 hover:text-white text-[clamp(11px,1.1vw,16px)]";

  return (
    <div className="flex items-center gap-4">
      <Link
        href={switchTo("pt")}
        locale="pt"
        onClick={() => {
          document.cookie = `NEXT_LOCALE=pt; path=/; max-age=31536000`;
        }}
        className={`transition ${isPortuguese ? activeClass : inactiveClass}`}
      >
        PT
      </Link>
      <Link
        href={switchTo("en")}
        locale="en"
        onClick={() => {
          document.cookie = `NEXT_LOCALE=en; path=/; max-age=31536000`;
        }}
        className={`transition ${!isPortuguese ? activeClass : inactiveClass}`}
      >
        EN
      </Link>
    </div>
  );
}
