import styled from 'styled-components';

import AmountCounter from '../Common/AmountCounter';
import Image from '../Common/Image';

import CartIcon from '../../assets/CartIcon';
import useCartProducts from '../../hooks/useCartProducts';
import useProductQuantity from '../../hooks/useProductQuantity';
import type { Product } from '../../types/product';

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const { id, imageUrl, name, price } = product;
  const { targetProduct, addProduct } = useCartProducts(product);
  const { addCount, subtractCount } = useProductQuantity(
    id,
    targetProduct?.quantity ?? 0
  );

  return (
    <ProductContainer>
      <Image
        src={`${process.env.PUBLIC_URL}/${imageUrl}`}
        alt={name}
        loading='lazy'
      />
      <ProductInfoContainer>
        <dl>
          <ProductName>{name}</ProductName>
          <ProductPrice>{price.toLocaleString('ko-KR')} 원</ProductPrice>
        </dl>
        {!targetProduct || targetProduct.quantity === 0 ? (
          <ProductCartBtn type='button' onClick={addProduct}>
            <CartIcon width={25} height={22} color='gray400' />
          </ProductCartBtn>
        ) : (
          <AmountCounter
            count={targetProduct.quantity}
            addCount={addCount}
            subtractCount={subtractCount}
            variant='small'
          />
        )}
      </ProductInfoContainer>
    </ProductContainer>
  );
};

const ProductContainer = styled.div`
  width: 282px;
`;

const ProductInfoContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-top: 18px;
  padding: 0 14px;
`;

const ProductName = styled.dt`
  line-height: 22px;
`;

const ProductPrice = styled.dd`
  font-size: 20px;
  line-height: 26.67px;
`;

const ProductCartBtn = styled.button`
  position: absolute;
  top: 0;
  right: 14px;
`;

export default ProductItem;
