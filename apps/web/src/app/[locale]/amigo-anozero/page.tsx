import AmigoAnozero from "@/components/AmigoAnozero";
import NewsMenu from "@/components/NewsMenu";

type PageProps = {
  params: {
    locale: string;
  };
};

export default async function AmigoAnozeroPage({params}: PageProps) {
  const {locale} = await params;

  return (
    <div className="min-h-screen flex flex-col">
      <NewsMenu />
      <main className="flex-1 pt-20">
        <AmigoAnozero />
      </main>
    </div>
  );
}
