import { Header } from 'components/@common';

export default {
  title: 'Components/@Common/Header',
  component: Header,
  parameters: {
    layout: 'centered',
  },
};

const Template = args => <Header {...args} />;

const DefaultHeader = Template.bind({});

DefaultHeader.args = {
  children: '제목',
};

export { DefaultHeader };
