import Title from './index';

export default {
  title: 'Component/@Common/Title',
  component: Title,
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
};

const Template = (args) => <Title {...args} />;

export const PageTitle = Template.bind({});
PageTitle.args = { description: '페이지 설명', children: '타이틀' };

export const ContentTitle = Template.bind({});
ContentTitle.args = { type: 'content', size: 18, children: '컨텐츠 타이틀' };
