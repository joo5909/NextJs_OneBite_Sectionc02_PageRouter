import "@/styles/globals.css";
import type { AppProps } from "next/app";
import GlobalLayout from "@/components/global-layout";
import { ReactNode } from "react";
import { NextPage } from "next";

type NextPageWithLayout = NextPage & {
  getSearchLayout?: (page: ReactNode) => ReactNode;
}

export default function App({ Component, pageProps }: AppProps & {Component: NextPageWithLayout}) {
  const getSearchLayout = Component.getSearchLayout ?? ((page : ReactNode) => page);
  return (
    <GlobalLayout>    
      {getSearchLayout(<Component {...pageProps} />)}
    </GlobalLayout>
  );
}
