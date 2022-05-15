import ProductCardInfo from "component/ProductCardInfo/ProductCardInfo";

export default {
  title: "ProductCardInfo",
  component: ProductCardInfo,
  decorators: [
    (Story) => (
      <div style={{ width: "188px" }}>
        <Story />
      </div>
    ),
  ],
};

const Template = (args) => <ProductCardInfo {...args} />;

export const DefaultProductCardInfo = Template.bind({});
DefaultProductCardInfo.args = {
  name: "PET보틀-정사각(420ml)",
  price: "43,400원",
};
