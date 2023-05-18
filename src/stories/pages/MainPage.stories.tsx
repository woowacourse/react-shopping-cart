import { Meta } from '@storybook/react';
import { handlers } from '../../mock/handler';
import MainPage from '../../pages/MainPage';

const meta = {
  component: MainPage,
  title: 'Pages/MainPage',
  parameters: {
    msw: handlers,
  },
} satisfies Meta<typeof MainPage>;

export default meta;

export const Main = () => {
  return <MainPage />;
};
