import "styles/globals.css";
import "@mantine/core/styles.css";
import type { AppProps } from "next/app";

import {
  MantineProvider,
  MantineThemeOverride,
  MantineTheme,
} from "@mantine/core";
import useMSWMockServer from "mocks/hooks";

export default function App({ Component, pageProps }: AppProps) {
  const shouldRender = useMSWMockServer();
  if (shouldRender === false) {
    return null;
  }

  // Define the custom theme with proper typing
  const customTheme: MantineThemeOverride = {
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

  return (
    <MantineProvider withStaticClasses withGlobalClasses theme={customTheme}>
      <Component {...pageProps} />
    </MantineProvider>
  );
}
