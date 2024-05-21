import type { Preview } from '@storybook/react';
import '@/f_shared/styles/reset.css';
import '@/f_shared/styles/color.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
  },
};

export default preview;
