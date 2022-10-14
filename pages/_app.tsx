import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../customhooks/useAuth";
import { RecoilRoot } from "recoil";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Loading = () => {
  const [loading, setLoading] = useState<boolean>();
  const router = useRouter();

  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && setLoading(true);
    const handleComplete = (url: string) =>
      url === router.asPath &&
      setTimeout(() => {
        setLoading(false);
      }, 300);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);

    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  return (
    <div>
      {loading && (
        <div className="flex justify-center items-center h-screen w-screen bg-black/70">
          <div
            className="spinner-border
            animate-spin
            inline-block
            w-8
            h-8
            border-4
            rounded
            text-red-700"
            role="status"
          >
          </div>
            <span className="visually-hidden ml-2">Loading</span>
        </div>
      )}
    </div>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <RecoilRoot>
        <Loading />
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
