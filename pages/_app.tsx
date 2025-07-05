import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import MainLayout from "@/layouts/MainLayout";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "@/context/AuthContext";
import { store } from "@/redux/store";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PiriLoader from "@/components/PiriLoader";
import { DefaultSeo } from 'next-seo';
import { defaultSEOConfig } from '@/lib/seo-config';

export default function App({ Component, pageProps, router }: AppProps) {
  const [loading, setLoading] = useState(true);
  const [routeLoading, setRouteLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const nextRouter = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleInitialLoad = () => {
      const minLoadTime = new Promise(resolve => setTimeout(resolve, 1200));
      
      const pageLoadTime = new Promise(resolve => {
        if (document.readyState === 'complete') {
          resolve(true);
        } else {
          window.addEventListener('load', () => resolve(true), { once: true });
        }
      });

      const hydrationTime = new Promise(resolve => {
        setTimeout(resolve, 300);
      });

      Promise.all([minLoadTime, pageLoadTime, hydrationTime]).then(() => {
        setLoading(false);
        setTimeout(() => setShowLoader(false), 500);
      });
    };

    handleInitialLoad();
  }, [mounted]);

  useEffect(() => {
    const handleStart = (url: string) => {
      if (url !== nextRouter.asPath) {
        setRouteLoading(true);
        setShowLoader(true);
      }
    };
    const handleComplete = () => {
      setRouteLoading(false);
      setTimeout(() => setShowLoader(false), 300);
    };

    nextRouter.events.on("routeChangeStart", handleStart);
    nextRouter.events.on("routeChangeComplete", handleComplete);
    nextRouter.events.on("routeChangeError", handleComplete);

    return () => {
      nextRouter.events.off("routeChangeStart", handleStart);
      nextRouter.events.off("routeChangeComplete", handleComplete);
      nextRouter.events.off("routeChangeError", handleComplete);
    };
  }, [nextRouter]);

  return (
    <Provider store={store}>
      <AuthProvider>
        <DefaultSeo {...defaultSEOConfig} />
        <MainLayout>
          <AnimatePresence>
            {showLoader && (loading || routeLoading) && (
              <PiriLoader />
            )}
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </MainLayout>
      </AuthProvider>
    </Provider>
  );
}
