import React from 'react';
import DetailProduct from 'templates/DetailProduct';

import Product from 'templates/Product';

export default {
  title: 'Template/Product',
  template: Product,
};

const ProductTemplate = (args) => <Product {...args} />;
const DetailProductTemplate = (args) => <DetailProduct {...args} />;

export const ProductPrimary = ProductTemplate.bind({});
ProductPrimary.args = {
  product_img_src:
    'https://w.namu.la/s/6b8cde4e81b3c27e7a6c065a42c154ebf27859d6ec4ffce64b6cc2e180f701c05034fedc888cfa7b99e590f819c2ebc1f3cd9ba9760c482c5bad74fa03d3d7d7748ae6580f3bd667ba8c9f91dec044a8d27ce733c5921699a48470d766bb0345c1a37328ca92fe0099dee89154848c38',
  product_title: 'LOVE (EP)',
  product_price: 59000,
};

export const DetailProductPrimary = DetailProductTemplate.bind({});
DetailProductPrimary.args = {
  product_img_src:
    'https://w.namu.la/s/e1203086a408b9b55a50210bf3e08d6e7646d659853010adb9bb76acede0dded64c90aaaaa78fcc5c788f304a01d459cf6b659654beac249814f1196c65413ec7677a280599591312dc65be3aaf6e727af4635ec06ea0890a66c00275b7c02b9740166f799844dd6d10ad319893da6e1',
  product_title: 'CATNIP (EP)',
  product_price: 59000,
};
