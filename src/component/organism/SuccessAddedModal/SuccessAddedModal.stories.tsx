import { Meta, Story } from '@storybook/react';
import SuccessAddedModal, { SuccessAddedModalProps } from './SuccessAddedModal';

export default {
  title: 'ShoppingCart/SuccessAddedModal',
  component: SuccessAddedModal,
} as Meta;

const Template: Story<SuccessAddedModalProps> = ({ ...args }) => (
  <SuccessAddedModal {...args} />
);

export const Basic = Template.bind({});

Basic.args = {
  productList: [
    {
      product_id: '1',
      name: 'name1',
      image_url: '',
      price: 123,
    },
    {
      product_id: '1',
      name: 'name1',
      image_url: '',
      price: 123,
    },
    {
      product_id: '1',
      name: 'name1',
      image_url: '',
      price: 123,
    },
  ],
  openModal: () => {},
  onClickMoveShoppingCartButton: () => {},
  onClickModalCloseButton: () => {},
};
