import { ClientProviders } from "@/providers/providers";
import "./globals.css";
import { Header } from "@/components/header";
import { Layout } from "@/components/layout";
import { Footer } from "@/components/footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          <Header />
          <Layout>{children}</Layout>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
