import {getTranslations} from "next-intl/server";
import {client} from "../../../sanity/client";
import {urlFor} from "../../../../lib/image";
import NewsMenu from "../../../components/NewsMenu";
import {Link} from "../../../navigation";
import Image from "next/image";

type PageProps = {
  params: {
    locale: string;
  };
};

async function getAllNews(locale: string) {
  return client.fetch(
    `*[_type == "news" && (language == $locale || (!defined(language) && $locale == "pt"))]
      | order((coalesce(destaque, false) == true) desc, coalesce(date, _createdAt) desc){
      _id,
      title,
      category,
      slug,
      image,
      date,
      _createdAt
    }`,
    {locale}
  );
}

export default async function AllNewsPage({params}: PageProps) {
  const {locale} = await params;
  const t = await getTranslations({locale});
  const news = await getAllNews(locale);

  return (
    <div className="min-h-screen flex flex-col">
      <NewsMenu />
      <main className="flex-1 pt-24 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-12">
            {t("home.allNews")}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item: any) => (
              <Link
                key={item._id}
                href={`/news/${item.slug.current}`}
                className="group block"
              >
                <article className="h-full flex flex-col p-6 hover:shadow-lg transition-shadow group-hover:bg-[#DE0F19] group-hover:text-white">
                  {item.image && (
                    <div className="relative aspect-4/3 mb-4 overflow-hidden">
                      <Image
                        src={urlFor(item.image).width(600).height(450).url()}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="flex-1">
                    {item.category && (
                      <span className="text-sm text-gray-500 uppercase tracking-wide mb-2 block group-hover:text-white">
                        {item.category}
                      </span>
                    )}
                    
                    <h2 className="text-xl font-bold mb-2 group-hover:underline">
                      {item.title}
                    </h2>
                    
                    {(item.date || item._createdAt) && (
                      <time className="text-sm text-gray-500 group-hover:text-white">
                        {new Date(item.date || item._createdAt).toLocaleDateString(
                          locale === "pt" ? "pt-PT" : "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </time>
                    )}
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {news.length === 0 && (
            <p className="text-center text-gray-500 py-12">
              {locale === "pt" ? "Nenhuma notícia disponível." : "No news available."}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
