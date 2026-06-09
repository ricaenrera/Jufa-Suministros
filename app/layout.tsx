import type { Metadata } from 'next';
import { Barlow_Condensed, Source_Sans_3 } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BotonWhatsApp from '@/components/ui/BotonWhatsApp';

const barlow = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-barlow',
  display: 'swap',
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-source',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Jufa Suministros | Insumos Médicos — Maturín, Venezuela',
  description: 'Jufa Suministros — Tu proveedor de confianza en insumos médicos. Av. Fuerzas Armadas, Maturín, Estado Monagas, Venezuela.',
  icons: { icon: '/logo.jpg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${barlow.variable} ${sourceSans.variable}`}>
      <body>
        <Header />
        {children}
        <Footer />
        <BotonWhatsApp />
      </body>
    </html>
  );
}
