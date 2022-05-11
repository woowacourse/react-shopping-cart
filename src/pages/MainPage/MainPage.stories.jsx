import MainPage from './MainPage';

export default {
  title: 'Page/MainPage',
  component: MainPage,
};

function Template(args) {
  return <MainPage {...args} />;
}

export const Default = Template.bind({});
