import { Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import MainPage from '../../pages/MainPage';

const meta = {
  component: MainPage,
  title: 'Pages/MainPage',
} satisfies Meta<typeof MainPage>;

export default meta;

export const Main = () => {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <MainPage />
      </RecoilRoot>
    </BrowserRouter>
  );
};
