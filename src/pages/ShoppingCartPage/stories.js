import ShoppingCartPage from '.';

export default {
  component: ShoppingCartPage,
  title: 'pages/ShoppingCartPage',
};

const Template = (args) => <ShoppingCartPage {...args} />;

export const Default = Template.bind({});

Default.args = {};
