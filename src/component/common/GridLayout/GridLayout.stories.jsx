import GridLayout from 'component/common/GridLayout/GridLayout';
import Product from 'component/Product/Product';

export default {
  title: 'Component/GridLayout',
  component: GridLayout,
  parameters: {
    layout: 'centered',
  },
};

const Template = args => (
  <GridLayout {...args}>
    {Array.from({ length: 10 }).map((_, index) => (
      <Product key={index} />
    ))}
  </GridLayout>
);

const DefaulGridLayout = Template.bind({});

export { DefaulGridLayout };
