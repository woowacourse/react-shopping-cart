import ProductThumbnail from "component/@shared/ProductThumbnail/ProductThumbnail";
import { Meta, Story } from "@storybook/react";
import { StyledType } from "styled-components";

export default {
  title: "ProductThumbnail",
  component: ProductThumbnail,
} as Meta;

const Template: Story<StyledType> = (args) => (
  <ProductThumbnail
    {...args}
    src="https://cdn-mart.baemin.com/goods/custom/20200525/11153-main-01.png"
  />
);

export const DefaultProductThumbnail = Template.bind({});
DefaultProductThumbnail.args = {
  type: "card",
};
