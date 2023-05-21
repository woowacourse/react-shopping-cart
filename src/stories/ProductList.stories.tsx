import { Meta, StoryObj } from '@storybook/react';
import { RecoilRoot } from 'recoil';

import ProductList from '../components/Product/ProductList';

import productApis from '../apis/products';

const meta = {
  title: 'Product/ProductList',
  component: ProductList,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    (Story) => (
      <RecoilRoot>
        <Story />
      </RecoilRoot>
    ),
  ],
  render: (args, { loaded: { products } }) => <ProductList {...products} />,
} satisfies Meta<typeof ProductList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  loaders: [
    async () => ({
      products: await productApis.get(),
    }),
  ],
};
