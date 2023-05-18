import type { Preview } from '@storybook/react';
import { GlobalStyle } from '../src/GlobalStyle';
import { withThemeFromJSXProvider } from '@storybook/addon-styling';
import { initialize, mswDecorator } from 'msw-storybook-addon';

export const decorators = [
  withThemeFromJSXProvider({
    GlobalStyles: GlobalStyle,
  }),
];

let options = {};
if (location.hostname === 'feb-dain.github.io') {
  options = {
    serviceWorker: {
      url: '/react-shopping-cart/mockServiceWorker.js',
    },
  };
}

initialize(options);

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'white',
      values: [
        {
          name: 'white',
          value: '#fff',
        },
        {
          name: 'black',
          value: '#000',
        },
      ],
    },
  },

  decorators: [mswDecorator],
};

export default preview;
