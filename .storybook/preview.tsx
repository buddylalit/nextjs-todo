import type { Preview } from "@storybook/react";
import { MantineProvider } from "@mantine/core";
import { mantineTheme } from "../pages/_app";
import React from "react";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => {
      return (
        <MantineProvider
          withCssVariables
          withGlobalClasses
          theme={mantineTheme}
        >
          {Story()}
        </MantineProvider>
      );
    },
  ],
};

export default preview;
