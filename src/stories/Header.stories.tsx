import { RecoilRoot } from 'recoil';
import { Header } from '../layout/header/Header';
import { Meta } from '@storybook/react';
import { GlobalStyle } from '../GlobalStyle';
import { BrowserRouter } from 'react-router-dom';

const meta = {
  title: 'Header',
  component: Header,
  decorators: [
    (Story) => {
      return (
        <BrowserRouter>
          <RecoilRoot>
            <GlobalStyle />
            <Story />
          </RecoilRoot>
        </BrowserRouter>
      );
    },
  ],
} as Meta;

export default meta;

export const HeaderComponent = () => <Header />;
