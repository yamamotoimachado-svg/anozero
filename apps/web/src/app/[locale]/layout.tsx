import {SanityLive} from "@/sanity/live";
import {NextIntlClientProvider} from "next-intl";
import {getMessages} from "next-intl/server";
import Footer from "../../components/Footer";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const {locale} = await params;
  const messages = await getMessages({locale});

  return (
    <NextIntlClientProvider key={locale} locale={locale} messages={messages}>
      {children}
      <Footer />
      <SanityLive />
    </NextIntlClientProvider>
  );
}
