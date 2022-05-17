import ProductCardInfo from "component/ProductList/ProductCardInfo/ProductCardInfo";
import { Story, Meta } from "@storybook/react";
import { Product } from "type";

export default {
  title: "ProductCardInfo",
  component: ProductCardInfo,
  decorators: [
    (Story: Story) => (
      <div style={{ width: "188px" }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: Story<Product> = (args) => <ProductCardInfo {...args} />;

export const DefaultProductCardInfo = Template.bind({});
DefaultProductCardInfo.args = {
  id: 0,
  name: "PET보틀-정사각(420ml)",
  price: 43400,
  thumbnail:
    "https://cdn-mart.baemin.com/goods/custom/20200525/11153-main-01.png",
};
