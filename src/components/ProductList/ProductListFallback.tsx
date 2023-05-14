import { ProductListContainer } from './ProductList';
import ProductItemFallback from '../ProductItem/ProductItemFallback';

const PRODUCT_ITEM_COUNT = 12;

const ProductListFallback = () => {
  return (
    <section>
      <ProductListContainer>
        {[...Array(PRODUCT_ITEM_COUNT)].map((_, index) => (
          <li key={index}>
            <ProductItemFallback />
          </li>
        ))}
      </ProductListContainer>
    </section>
  );
};

export default ProductListFallback;
