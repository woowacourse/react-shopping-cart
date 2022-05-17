import ProductDeleteButton from 'components/ProductDeleteButton/ProductDeleteButton';

export default {
  title: 'ProductDeleteButton',
  component: ProductDeleteButton,
};

export const DefaultProductDeleteButton = (args) => (
  <ProductDeleteButton {...args}>상품삭제</ProductDeleteButton>
);
DefaultProductDeleteButton.args = {};
