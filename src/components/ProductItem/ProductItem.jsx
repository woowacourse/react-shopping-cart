import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import smallCart from 'assets/svg/smallCart.svg';
import { API_PATH, PATH } from 'constants/path';
import usePost from 'hooks/shared/usePost';
import useGetCartList from 'hooks/useGetCartList';

const ProductItem = ({ id, name, price, imgUrl }) => {
  const navigate = useNavigate();
  const { callPostApi: postCartList } = usePost(API_PATH.CART_LIST, {
    id,
    cartQuantity: 1,
  });

  const { cartList, getCartList } = useGetCartList();

  const handleClickProduct = () => {
    navigate(`${PATH.PRODUCT}/${id}`);
  };

  const handleClickCart = async () => {
    await postCartList();
    await getCartList();
  };

  return (
    <Styled.Wrapper>
      <Styled.ProductImage
        src={imgUrl}
        alt={name}
        onClick={handleClickProduct}
      />
      <Styled.ProductDetail>
        <Styled.ProductInfo onClick={handleClickProduct}>
          <Styled.ProductName>{name}</Styled.ProductName>
          <Styled.ProductPrice>{price}원</Styled.ProductPrice>
        </Styled.ProductInfo>
        <Styled.CartButton
          onClick={handleClickCart}
          isInCart={cartList.find((item) => item.id === id)}
        >
          <Styled.CartSvg src={smallCart} />
        </Styled.CartButton>
      </Styled.ProductDetail>
    </Styled.Wrapper>
  );
};

ProductItem.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  price: PropTypes.string,
  imgUrl: PropTypes.string,
};

const Styled = {
  Wrapper: styled.div`
    width: 200px;
    cursor: pointer;
  `,
  ProductImage: styled.img`
    border-radius: 4px;
    max-width: 100%;
    &:hover {
      filter: brightness(90%);
    }
  `,
  ProductDetail: styled.div`
    display: flex;
    justify-content: space-between;
    padding: 5px 0 5px 5px;
    width: 100%;
  `,
  ProductInfo: styled.div`
    display: flex;
    flex-direction: column;
  `,
  ProductName: styled.span`
    font-size: 14px;
    width: 147px;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  ProductPrice: styled.span`
    font-size: 18px;
  `,
  CartButton: styled.button`
    background-color: ${({ isInCart }) =>
      isInCart ? '#a7e2f75d' : 'transparent'};
    border-radius: 7px;
    border: none;
    padding: 6px;
    cursor: pointer;
    &:hover {
      background-color: #a7e2f75d;
    }
  `,
  CartSvg: styled.img`
    max-width: 100%;
  `,
};

export default ProductItem;
