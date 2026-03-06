import { redirect } from "next/navigation";

type PageProps = {
  params: {
    slug: string;
  };
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  redirect(`/pt/news/${slug}`);
}
