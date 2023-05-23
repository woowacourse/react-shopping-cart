import { Meta } from '@storybook/react';
import MainPage from '../../pages/MainPage';

const meta = {
  component: MainPage,
  title: 'Pages/MainPage',
} satisfies Meta<typeof MainPage>;

export default meta;

export const Main = () => <MainPage />;
