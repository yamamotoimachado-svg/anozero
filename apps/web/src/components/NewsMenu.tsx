"use client";

import Image from "next/image";
import {Link} from "../navigation";
import LocaleSwitcher from "./LocaleSwitcher";
import logo from "../assets/Logo Anozero Cor.png";
import {useEffect, useRef, useState} from "react";

export default function NewsMenu() {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      const scrollingUp = currentY < lastScrollY.current;

      setVisible(scrollingUp || currentY < 10);
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, {passive: true});

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={`w-full border-b border-gray-200 bg-white fixed top-0 left-0 z-40 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="w-full px-6 py-3 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center" aria-label="Home">
          <Image src={logo} alt="Anozero" className="h-14 w-auto" />
        </Link>
        <LocaleSwitcher variant="news" />
      </div>
    </header>
  );
}