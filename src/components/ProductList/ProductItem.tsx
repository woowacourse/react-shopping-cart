import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { cartAtom } from '@recoil/atoms/cartAtom';
import { CartInformation } from '@type/types';
import { theme } from '@styles/theme';
import AddCartButton from './AddCartButton';

interface ProductItemProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

const ProductItem = ({ id, name, price, imageUrl }: ProductItemProps) => {
  const [cart, setCart] = useRecoilState(cartAtom);

  const addProductToCart = () => {
    const product: CartInformation = {
      id,
      product: { name, price, imageUrl, id },
      quantity: 1,
    };

    setCart([...cart, product]);
  };

  const removeProductFromCart = () => {
    const updatedCart = cart.filter((product)=> id !== product.id)

    setCart(updatedCart)
  }
  
  return (
    <Wrapper>
      <Picture src={imageUrl} alt={name} />
      <InformationWrapper>
        <TitleAndPriceWrapper>
          <Title>{name}</Title>
          <Price>{price.toLocaleString('ko-KR')} 원</Price>
        </TitleAndPriceWrapper>
        <AddCartButton addProductToCart={addProductToCart} removeProductFromCart={removeProductFromCart}/>
      </InformationWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 282px;
`;

const Picture = styled.img`
  width: 282px;
  height: 282px;

  margin-bottom: 18px;
`;

const InformationWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  margin-left: 10px;
`;

const TitleAndPriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;

  letter-spacing: 0.5px;

  color: ${theme.colors.primaryBlack};
`;

const Price = styled.span`
  font-weight: 400;
  font-size: 20px;
  line-height: 27px;

  letter-spacing: 0.5px;

  color: ${theme.colors.primaryBlack};
`;

export default ProductItem;
