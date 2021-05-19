import Header from './Header';

export default {
  title: 'ShoppingCart/Header',
  component: Header,
  argTypes: { children: { control: 'text' } },
};

const Template = ({ ...args }) => <Header {...args} />;

export const Basic = Template.bind({});

Basic.args = { children: '주문목록' };
