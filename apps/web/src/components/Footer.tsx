"use client";

import Image from "next/image";
import {usePathname} from "next/navigation";
import messagesEn from "../messages/en.json";
import messagesPt from "../messages/pt.json";

import logoCirculo from "../assets/logosFooter/circulo-pequena_escala.png";
import logoRpac from "../assets/logosFooter/Rpac_logotipo horizontal_PT.png";
import logoDgartes from "../assets/logosFooter/dgartes_horizontal PB.png";
import logoCMC from "../assets/logosFooter/logoCMCPreto.png";
import logoUC from "../assets/logosFooter/logoUCPreto.png";
import logoRepport from "../assets/logosFooter/repportP.png";

const groupOneLogos = [
  {src: logoCirculo, alt: "Círculo de Artes Plásticas de Coimbra"},
  {src: logoCMC, alt: "Câmara Municipal de Coimbra"},
  {src: logoUC, alt: "Universidade de Coimbra"},
];

const groupTwoLogos = [
  {src: logoRepport, alt: "Repport"},
  {src: logoDgartes, alt: "DGArtes"},
  {src: logoRpac, alt: "RPAC"},
];

export default function Footer() {
  const pathname = usePathname() || "/";
  const locale = pathname.startsWith("/en") ? "en" : "pt";
  const messages = locale === "en" ? messagesEn : messagesPt;
  const groupOneTitle = messages.footer.groupOneTitle;
  const groupTwoTitle = messages.footer.groupTwoTitle;
  const contactsTitle = messages.footer.contactsTitle;
  const hoursTitle = messages.footer.hoursTitle;
  const emailLabel = messages.footer.emailLabel;
  const emailValue = messages.footer.emailValue;
  const places = messages.footer.places;
  const socialTitle = messages.footer.socialTitle;

  const socialLinks = [
    {label: "Facebook", href: "https://web.facebook.com/anozerocoimbra/?locale=pt_PT&_rdc=1&_rdr#"},
    {label: "Instagram", href: "https://www.instagram.com/anozerocoimbra/"},
    {label: "LinkedIn", href: "https://pt.linkedin.com/company/anozero-bienal-de-coimbra"},
  ];

  return (
    <footer className="border-t border-gray-200" data-locale={locale}>
      <div className=" max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col gap-16">
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-4">
              {groupOneTitle}
            </p>
            <div className="flex flex-wrap items-center gap-6">
              {groupOneLogos.map((logo) => (
                <Image
                  key={logo.alt}
                  src={logo.src}
                  alt={logo.alt}
                  className="h-10 w-auto object-contain"
                />
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-700 mb-4">
              {groupTwoTitle}
            </p>
            <div className="flex flex-wrap items-center gap-6">
              {groupTwoLogos.map((logo) => (
                <Image
                  key={logo.alt}
                  src={logo.src}
                  alt={logo.alt}
                  className="h-10 w-auto object-contain"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          <div className="md:col-span-2 grid gap-10 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-4">
                {places.mosteiro.title}
              </p>
              <div className="text-sm text-gray-600 space-y-2">
                <p>{places.mosteiro.address}</p>
                <p>
                  <span className="font-semibold text-gray-700">{contactsTitle}:</span>{" "}
                  {places.mosteiro.phone}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">{hoursTitle}:</span>{" "}
                  {places.mosteiro.hours}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-700 mb-4">
                {places.circulo.title}
              </p>
              <div className="text-sm text-gray-600 space-y-2">
                <p>{places.circulo.address}</p>
                <p>
                  <span className="font-semibold text-gray-700">{contactsTitle}:</span>{" "}
                  {places.circulo.phone}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">{hoursTitle}:</span>{" "}
                  {places.circulo.hours}
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-700 mb-4">
              {socialTitle}
            </p>
            <div className="flex flex-col gap-2 text-sm">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 underline"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-600">
              <span className="font-semibold text-gray-700">{emailLabel}:</span>{" "}
              <a className="underline" href={`mailto:${emailValue}`}>
                {emailValue}
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
