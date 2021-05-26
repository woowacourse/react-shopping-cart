import { CartProductDetailType } from '../../../type';
import RowProductItem from '../../molecule/RowProductItem/RowProductItem';
import { Container } from './CheckoutProductList.styles';

interface CheckoutProductListProps {
  checkedProductList: Array<CartProductDetailType>;
}

const CheckoutProductList = ({
  checkedProductList,
}: CheckoutProductListProps) => (
  <Container>
    {checkedProductList.map(({ product_id, image_url, name, quantity }) => (
      <RowProductItem
        key={product_id}
        product_id={product_id}
        image_url={image_url}
        name={name}
        quantity={quantity}
      />
    ))}
  </Container>
);

export default CheckoutProductList;
export type { CheckoutProductListProps };
