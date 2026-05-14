import NewsMenu from "@/components/NewsMenu";
import About from "@/components/About";

type PageProps = {
  params: {
    locale: string;
  };
};

export default async function AboutPage({params}: PageProps) {
  const {locale} = await params;

  return (
    <div className="min-h-screen flex flex-col">
      <NewsMenu />
      <main className="flex-1 pt-20">
        <About />
      </main>
    </div>
  );
}
