import { DM_Sans, Roboto } from 'next/font/google';
import './globals.css';

import './HomeCss/Navbar.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageTransitionWrapper from './components/PageTransitionWrapper';
// import SmoothScrollLayout from './components/SmoothScroll';

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
      
      <head>
        {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" crossOrigin="anonymous" referrerPolicy="no-referrer" /> */}
      </head>
      <body className="font-roboto">
        <Navbar />
        <PageTransitionWrapper>
        {/* <SmoothScrollLayout> */}
        <main>{children}</main>
        </ PageTransitionWrapper>
        {/* </SmoothScrollLayout> */}
        <Footer />
      </body>
    </html>
  );
}