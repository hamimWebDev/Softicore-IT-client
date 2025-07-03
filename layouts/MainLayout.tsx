import { FC, ReactNode } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'sonner';
import ScrollToTop from '@/components/ui/ScrollToTop';

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const MainLayout: FC<MainLayoutProps> = ({
  children,
  title = 'Md. Hamim Howlader Asif',
  description = 'Professional MERN stack developer portfolio showcasing projects and skills',
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
      
      <ScrollToTop />
      
      <Toaster 
        position="bottom-right"
        richColors
        closeButton
        duration={4000}
        theme="dark"
      />
    </>
  );
};

export default MainLayout;