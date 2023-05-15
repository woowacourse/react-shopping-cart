import type { StoryFn } from '@storybook/react';

import Product from './Product';

export default {
  title: 'Product',
  component: Product,
};

const Template: StoryFn<React.ComponentProps<typeof Product>> = (props) => <Product {...props} />;

export const Controls = Template.bind({});
Controls.args = {
  id: 96,
  name: 'SONY 컨트롤러',
  price: 104000,
  imageUrl: 'https://picsum.photos/id/96/300',
};
