import PageTitle from './index';

export default {
  title: 'Component/@Common/PageTitle',
  component: PageTitle,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {},
};

const Template = (args) => <PageTitle {...args} />;

export const DefaultTitle = Template.bind({});
DefaultTitle.args = { description: '페이지 설명', children: '타이틀' };
