import CartProductItem from '../components/CartProductItem';

export default {
  title: 'Component/CartProductItem',
  component: CartProductItem,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

const Template = (args) => <CartProductItem {...args} />;

export const DefaultTemplate = Template.bind({});

DefaultTemplate.args = {
  thumbnail: 'https://storybook.takealook.kr/image/potato.jpg',
  name: '감자',
  price: 50000,
  id: 0,
  isChecked: () => true,
  handleItemCount: () => {},
};
