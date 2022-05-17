import ErrorPage from './ErrorPage.page';

export default {
  title: 'Pages/ErrorPage',
  component: ErrorPage,
};

export const Default = args => <ErrorPage {...args}>에러 페이지입니다</ErrorPage>;
Default.args = {};
