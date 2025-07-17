import { DM_Sans, Roboto } from 'next/font/google';
import './globals.css';
import './style/Platform.css';
import './HomeCss/Navbar.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageTransitionWrapper from './components/PageTransitionWrapper';
import SmoothScrollLayout from './components/SmoothScroll';

const dm_sans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
  weight: ['400', '500', '700']
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata = {
  title: "Atoll Solutions - Jamstack Website",
  description: "Building JamStack websites and providing real-time location visibility.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dm_sans.variable} ${roboto.variable}`}>
      <body className="font-roboto">
        <div className="page-wrapper">
          <Navbar />
          <PageTransitionWrapper>
            <SmoothScrollLayout>
              <main>{children}</main>
            </SmoothScrollLayout>
            <Footer />
          </PageTransitionWrapper>
        </div>
      </body>
    </html>
  );
}