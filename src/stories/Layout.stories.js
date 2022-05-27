import Layout from 'components/Layout';

export default {
  title: 'Component/Layout',
  component: Layout,
  parameters: {
    layout: 'centered',
  },
};

const Template = (args) => <Layout {...args} />;

export const DefaultTemplate = Template.bind({});

DefaultTemplate.args = {
  children: '이 공간에 페이지의 컨텐츠가 들어갑니다',
};
