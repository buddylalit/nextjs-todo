import "styles/globals.css";
import "@mantine/core/styles.css";
import type { AppProps } from "next/app";

import { createTheme, MantineProvider } from "@mantine/core";
import useMSWMockServer from "mocks/hooks";
import { TaskProvider } from "context/tasks";

export default function App({ Component, pageProps }: AppProps) {
  const shouldRender = useMSWMockServer();
  if (shouldRender === false) {
    return null;
  }
  const theme = createTheme({
    /** Put your mantine theme override here */
  });

  return (
    <MantineProvider withStaticClasses withGlobalClasses theme={theme}>
      <TaskProvider>
        <Component {...pageProps} />
      </TaskProvider>
    </MantineProvider>
  );
}
