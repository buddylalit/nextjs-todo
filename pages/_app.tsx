import "styles/globals.css";
import "@mantine/core/styles.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import {
  MantineProvider,
  MantineThemeOverride,
  MantineTheme,
} from "@mantine/core";
import useMSWMockServer from "mocks/hooks";
import { useState } from "react";

export const mantineTheme: MantineThemeOverride = {
  components: {
    Button: {
      styles: (theme: MantineTheme) => ({
        root: {
          "&.delete-todo": {
            backgroundColor: theme.colors.red[6],
            color: theme.white,
            "&:hover": {
              backgroundColor: theme.colors.red[7],
            },
          },
        },
      }),
    },
  },
};

export default function App({ Component, pageProps }: AppProps) {
  const shouldRender = useMSWMockServer();
  const [queryClient] = useState(() => new QueryClient());
  if (shouldRender === false) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <MantineProvider withStaticClasses withGlobalClasses theme={mantineTheme}>
        <Component {...pageProps} />
      </MantineProvider>
    </QueryClientProvider>
  );
}
