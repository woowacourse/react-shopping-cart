import GridLayout from 'component/common/GridLayout';
import Product from 'component/ProductList/Product';

export default {
  title: 'Component/GridLayout',
  component: GridLayout,
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
};

const Template = args => <GridLayout {...args}></GridLayout>;

const DefaultGridLayout = Template.bind({});

DefaultGridLayout.args = {
  children: [
    {
      image: 'https://i.pinimg.com/474x/4a/47/d5/4a47d5956eb090ff702e3b2cb47fdf98.jpg',
      name: '사과',
      price: 1300,
    },
    {
      image: 'https://i.pinimg.com/474x/4a/47/d5/4a47d5956eb090ff702e3b2cb47fdf98.jpg',
      name: '사과',
      price: 1300,
    },
    {
      image: 'https://i.pinimg.com/474x/4a/47/d5/4a47d5956eb090ff702e3b2cb47fdf98.jpg',
      name: '사과',
      price: 1300,
    },
    {
      image: 'https://i.pinimg.com/474x/4a/47/d5/4a47d5956eb090ff702e3b2cb47fdf98.jpg',
      name: '사과',
      price: 1300,
    },
  ].map(product => <Product key={product.id} {...product} />),
};

export { DefaultGridLayout as DefaulGridLayout };
