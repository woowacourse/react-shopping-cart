import { Meta } from '@storybook/react';
import { RecoilRoot } from 'recoil';
import MainPage from '../../pages/MainPage';

const meta = {
  component: MainPage,
  title: 'Page/MainPage',
} satisfies Meta<typeof MainPage>;

export default meta;

export const Main = () => {
  return (
    <RecoilRoot>
      <MainPage />
    </RecoilRoot>
  );
};
