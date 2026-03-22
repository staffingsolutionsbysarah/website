import type { Metadata } from 'next';
import { Inter, Poppins, Roboto } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({ weight: ['400', '600', '700'], subsets: ['latin'], variable: '--font-poppins' });
const roboto = Roboto({ weight: ['400', '500', '700'], subsets: ['latin'], variable: '--font-roboto' });

export const metadata: Metadata = {
  title: 'Staffing Solutions by Sarah Fell, Inc. | Skilled Trades Recruitment',
  description: 'Fast, conversion-focused skilled trades and manufacturing recruitment in Canada. Connecting top talent with top employers.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} ${roboto.variable} font-body bg-[#F5F5F5] text-[#2C3E50] antialiased flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-grow">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
