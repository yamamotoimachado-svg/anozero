import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body
        className="bg-gray-100 dark:bg-gray-900 min-h-screen"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
