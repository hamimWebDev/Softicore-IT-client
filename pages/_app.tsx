// /pages/_app.tsx
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
import { DefaultSeo } from "next-seo";
import { defaultSEOConfig } from "@/lib/seo-config";
import Script from "next/script"; // Clarity এবং GA এর জন্য

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

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
      // Use requestAnimationFrame for better performance
      const startTime = Date.now();
      const minLoadTime = 1200;
      
      const checkLoadComplete = () => {
        const elapsed = Date.now() - startTime;
        const isPageLoaded = document.readyState === "complete";
        
        if (elapsed >= minLoadTime && isPageLoaded) {
          setLoading(false);
          // Use requestAnimationFrame for smoother transitions
          requestAnimationFrame(() => {
            setTimeout(() => setShowLoader(false), 500);
          });
        } else {
          requestAnimationFrame(checkLoadComplete);
        }
      };
      
      // Start checking
      requestAnimationFrame(checkLoadComplete);
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

    const handleComplete = (url: string) => {
      // Google Analytics pageview
      if (typeof window.gtag === "function") {
        window.gtag("config", "G-BKGRMN3WW9", {
          page_path: url,
        });
      }
      setRouteLoading(false);
      // Use requestAnimationFrame for smoother transitions
      requestAnimationFrame(() => {
        setTimeout(() => setShowLoader(false), 300);
      });
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
        {/* Default SEO */}
        <DefaultSeo {...defaultSEOConfig} />

        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-BKGRMN3WW9"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-BKGRMN3WW9', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />

        {/* Microsoft Clarity */}
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];
                  if(y && y.parentNode) {
                      y.parentNode.insertBefore(t,y);
                  } else {
                      l.head.appendChild(t);
                  }
              })(window, document, "clarity", "sajewd08mh");
            `,
          }}
        />

        <MainLayout>
          <AnimatePresence>
            {showLoader && (loading || routeLoading) && <PiriLoader />}
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </MainLayout>
      </AuthProvider>
    </Provider>
  );
}
