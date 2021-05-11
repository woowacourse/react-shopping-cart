import React from "react";
import { Story, Meta } from "@storybook/react";

import ProductImage, { IProductImageProps } from ".";

export default {
  title: "ProductImage",
  component: ProductImage,
} as Meta;

const Template: Story<IProductImageProps> = (args) => <ProductImage {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  size: "282px",
  src: "http://via.placeholder.com/400x400",
};

export const Large = Template.bind({});

Large.args = {
  size: "570px",
  src: "http://via.placeholder.com/400x400",
};

export const Small = Template.bind({});

Small.args = {
  size: "144px",
  src: "http://via.placeholder.com/400x400",
};
