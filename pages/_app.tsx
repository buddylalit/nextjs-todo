import "styles/globals.css";
import "@mantine/core/styles.css";

import type { AppProps } from "next/app";
import { useEffect } from "react";

import { createTheme, MantineProvider } from "@mantine/core";

export default function App({ Component, pageProps }: AppProps) {
  const theme = createTheme({
    /** Put your mantine theme override here */
  });

  //   useEffect(() => {
  //     (async()=>{
  //        if (process.env.NODE_ENV === 'development') {
  //     const { worker } = await import('./mocks/browser');
  //     worker.start();
  //   }
  //     })()

  // }, []);

  return (
    <MantineProvider withStaticClasses withGlobalClasses theme={theme}>
      <Component {...pageProps} />
    </MantineProvider>
  );
}
