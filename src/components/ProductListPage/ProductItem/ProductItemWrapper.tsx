import { RecoilRoot } from 'recoil';
import ProductItem, { ProductItemProps } from './ProductItem.tsx';

const ProductItemWrapper = (props: ProductItemProps) => {
  return (
    <RecoilRoot>
      <ProductItem {...props} />
    </RecoilRoot>
  );
};

export default ProductItemWrapper;
