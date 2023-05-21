import type { Preview } from '@storybook/react';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import React, { Suspense } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';

import SpinnerContainer from '../src/components/common/SpinnerContainer/SpinnerContainer';
import { handlers } from '../src/mocks/handlers';
import { StoryContainerWrapper } from '../src/stories/styles';
import GlobalStyle from '../src/styles/GlobalStyle';
import theme from '../src/styles/theme';

initialize();

const customViewports = {
  Default: {
    name: 'Default',
    styles: {
      width: '1280px',
      height: '832px',
    },
  },
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport: {
      viewports: { ...customViewports },
      defaultViewport: 'Default',
    },
    msw: {
      handlers: [...handlers],
    },
  },
};

export default preview;

const localStorageResetDecorator = (Story) => {
  window.localStorage.clear();
  return <Story />;
};

export const decorators = [
  (Story) => (
    <MemoryRouter initialEntries={['/']}>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Suspense
            fallback={
              <StoryContainerWrapper>
                <SpinnerContainer message="Loading..." />
              </StoryContainerWrapper>
            }
          >
            <Story />
          </Suspense>
        </ThemeProvider>
      </RecoilRoot>
    </MemoryRouter>
  ),
  localStorageResetDecorator,
  mswDecorator,
];
