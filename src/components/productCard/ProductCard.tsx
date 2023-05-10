import styled from 'styled-components';
import { Product } from '../../types/Product';
import { Counter } from './Counter';
import { useRecoilState } from 'recoil';
import { cartListState } from '../../App';
import { ShoppingCartIcon } from '../../assets/ShoppingCartIcon';

export const ProductCard = ({ id, name, price, imageUrl }: Product) => {
  const [cartList, setCartList] = useRecoilState(cartListState);

  const addProductToCartList = () => {
    if (!cartList.includes(id)) setCartList((current) => [...current, id]);
  };

  const removeItemFromCartList = () => {
    setCartList((current) => current.filter((productId) => productId !== id));
  };

  return (
    <Style.Container>
      <Style.Image src={imageUrl} alt="상품 이미지" />
      <Style.DescriptionContainer>
        <Style.NamePriceContainer>
          <Style.Name>{name}</Style.Name>
          <Style.Price>{price}원</Style.Price>
        </Style.NamePriceContainer>
        {cartList.includes(id) ? (
          <Counter removeItemFromCartList={removeItemFromCartList} />
        ) : (
          <ShoppingCartIcon handleClick={addProductToCartList} />
        )}
      </Style.DescriptionContainer>
    </Style.Container>
  );
};

const Style = {
  Container: styled.li`
    width: 283px;
    height: 358px;

    display: flex;
    flex-direction: column;
    gap: 18px;
  `,
  Image: styled.img`
    width: 283px;
    height: 283px;
  `,
  DescriptionContainer: styled.div`
    width: 283px;

    display: flex;
    justify-content: space-between;
  `,
  NamePriceContainer: styled.div`
    display: flex;
    flex-direction: column;

    width: 201px;
    gap: 10px;
  `,
  Name: styled.span`
    font-size: 16px;
  `,
  Price: styled.span`
    font-size: 20px;
  `,
};
