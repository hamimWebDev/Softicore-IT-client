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

export default function App({ Component, pageProps, router }: AppProps) {
  const [loading, setLoading] = useState(false);
  const nextRouter = useRouter();

  useEffect(() => {
    const handleStart = (url: string) => {
      if (url !== nextRouter.asPath) {
        setLoading(true);
      }
    };
    const handleComplete = () => setLoading(false);

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
        <MainLayout>
          {loading && <PiriLoader />}
          <AnimatePresence mode="wait">
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </MainLayout>
      </AuthProvider>
    </Provider>
  );
}
