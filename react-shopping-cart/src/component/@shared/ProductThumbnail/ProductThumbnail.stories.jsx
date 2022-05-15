import ProductThumbnail from "component/@shared/ProductThumbnail/ProductThumbnail";

export default {
  title: "ProductThumbnail",
  component: ProductThumbnail,
};

const Template = (args) => <ProductThumbnail {...args} />;

export const DefaultProductThumbnail = Template.bind({});
DefaultProductThumbnail.args = {
  src: "https://cdn-mart.baemin.com/goods/custom/20200525/11153-main-01.png",
  type: "card",
};
