import ChangeQuantityButton from './ChangeQuantityButton.component';

import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/ChangeQuantityButton',
  component: ChangeQuantityButton,
};

export const Default = args => <ChangeQuantityButton {...args} />;
Default.args = {
  quantity: 1,
  onClickAddProduct: action('clicked'),
  onClickReduceProduct: action('clicked'),
};
