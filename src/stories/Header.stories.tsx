import { RecoilRoot } from 'recoil';
import { Header } from '../layout/header/Header';
import { Meta } from '@storybook/react';

const meta = {
  title: 'Header',
  component: Header,
  decorators: [
    (Story) => {
      return <RecoilRoot>{Story()}</RecoilRoot>;
    },
  ],
} as Meta;

export default meta;

export const HeaderComponent = () => <Header />;
