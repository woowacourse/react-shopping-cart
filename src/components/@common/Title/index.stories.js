import Title from './index';

export default {
  title: 'Component/@Common/Title',
  component: Title,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {},
};

const Template = (args) => <Title {...args} />;

export const DefaultTitle = Template.bind({});
DefaultTitle.args = { description: '페이지 설명', children: '타이틀' };
