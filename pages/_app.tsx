import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../customhooks/useAuth";
import { RecoilRoot } from "recoil";
import React, { useState, useEffect } from "react";
import { Loader } from "../components/Loader";
function MyApp({ Component, pageProps }: AppProps) {

  const loaderStyles =
    "spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full";

  return (
    <>
      <RecoilRoot>
        <Loader styles={loaderStyles} />
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
