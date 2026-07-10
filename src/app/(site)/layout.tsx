import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Toaster } from "@/components/ui/sonner";
import { getConfiguracoesGerais, getSeguros } from "@/sanity/lib/queries";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [seguros, config] = await Promise.all([getSeguros(), getConfiguracoesGerais()]);

  return (
    <>
      <Header seguros={seguros} config={config} />
      <main>{children}</main>
      <Footer seguros={seguros} config={config} />
      <Toaster position="top-center" />
    </>
  );
}
