import {getTranslations} from "next-intl/server";
import {client} from "../../sanity/client";
import Carousel from "../../components/Carousel";
import NewsCarousel from "../../components/NewsCarousel";
import LocaleSwitcher from "../../components/LocaleSwitcher";

import logo from "../../assets/logo.png";
import img1 from "../../assets/2025.jpg";
import img2 from "../../assets/2024.jpg";
import img3 from "../../assets/2023.jpg";
import img4 from "../../assets/2020-21.jpg";
import img5 from "../../assets/2020.jpg";
import img6 from "../../assets/2019.png";
import img7 from "../../assets/2017.jpg";
import img8 from "../../assets/2015.jpg";

type PageProps = {
  params: {
    locale: string;
  };
};

async function getNews(locale: string) {
  return client.fetch(
    `*[_type == "news" && (language == $locale || (!defined(language) && $locale == "pt"))]
      | order((coalesce(destaque, false) == true) desc, coalesce(date, _createdAt) desc){
      _id,
      title,
      category,
      slug,
      image,
      body
    }`,
    {locale}
  );
}

export default async function Home({params}: PageProps) {
  const {locale} = await params;
  const t = await getTranslations({locale});
  const news = await getNews(locale);

  const slides = [
    {
      year: "Solo'2025",
      image: img1.src,
      href: "https://geral.anozero-bienaldecoimbra.pt/anozero-soloshow25/",
      name: {pt: "A Fábrica das Sombras", en: "The Factory of Shadows"},
    },
    {
      year: "2024",
      image: img2.src,
      href: "https://ofantasmadaliberdade.anozero-bienaldecoimbra.pt/",
      name: {pt: "O Fantasma da Liberdade", en: "The Phantom of Liberty"},
    },
    {
      year: "Solo'2023",
      image: img3.src,
      href: "https://geral.anozero-bienaldecoimbra.pt/anozero-soloshow23/",
      name: {pt: "— não sofra mais", en: "— não sofra mais"},
    },
    {
      year: "2021-22",
      image: img4.src,
      href: "https://21-22.anozero-bienaldecoimbra.pt/en",
      name: {pt: "Meia-Noite", en: "Meia-Noite"},
    },
    {
      year: "Solo'2020",
      image: img5.src,
      href: "https://geral.anozero-bienaldecoimbra.pt/2020/09/14/campo-contracampo-jose-pedro-croft/",
      name: {pt: "Campo/Contracampo", en: "Field/Counterfield"},
    },
    {
      year: "2019",
      image: img6.src,
      href: "https://2019.anozero-bienaldecoimbra.pt",
      name: {pt: "A Terceira Margem", en: "The Third Bank"},
    },
    {
      year: "2017",
      image: img7.src,
      href: "https://2017.anozero-bienaldecoimbra.pt",
      name: {pt: "Curar e Reparar", en: "Healing and Repairing"},
    },
    {
      year: "2015",
      image: img8.src,
      href: "https://2015.anozero-bienaldecoimbra.pt",
      name: {pt: "Um lance de dados", en: "A Roll of the Dice"},
    },
  ];

  return (
    <div className="home-parallax">
      <div className="home-parallax__hero">
        <Carousel
          slides={slides}
          logo={logo.src}
          locale={locale as "pt" | "en"}
          overlay={<LocaleSwitcher />}
        />
      </div>

      <div className="home-parallax__content px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <h1>—</h1>
          <NewsCarousel
            title={t("home.newsTitle")}
            news={news}
            locale={locale as "pt" | "en"}
          />
        </div>
      </div>
    </div>
  );
}
