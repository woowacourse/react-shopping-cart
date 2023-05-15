import type { Meta, StoryObj } from '@storybook/react';
import ProductItem from './ProductItem';

const meta = {
  title: 'box/ProductItem',
  component: ProductItem,
  tags: ['autodocs'],
} satisfies Meta<typeof ProductItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ProductContent: Story = {
  args: {
    product: {
      id: 1,
      name: 'PET보틀-정사각(370ml)',
      price: 41000,
      imageUrl:
        'https://s3-alpha-sig.figma.com/img/05ef/e578/d81445480aff1872344a6b1b35323488?Expires=1684713600&Signature=gvkVAezZeNJ6-pOzrsQBqsdfN9PGcEmV7HraRhfgfmXTZD0rCy-OEhFh-uP4y7AxUs5FC6ILRG-RNHslTX8x8q9HHcLyVrFq6I1uzwKaZyyWOCwAYgglD99UQlYPlVCU3E-8eIUfX~TRBM~dSPsojsKv-cNJU1gGPOE7G9C3Z1CKoDjIFZ8G2J4TG16VvSzil0RHsGGPi~06jOwn3Dtq~oBZQ1yhoRgfYDrGLlsexYockI38hGjBcBx1gJWg41~kBGNhueXs-tmuLfqRoPc0ReK~jWKLiGZi2JVPaIP-tPOfSAUEt99Po0KzVG-agBflDRhhpybhrR1bmozDvb~9eg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    },
  },
};
