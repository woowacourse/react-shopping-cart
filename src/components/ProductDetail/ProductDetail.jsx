import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import usePost from 'hooks/shared/usePost';
import useGetCartList from 'hooks/useGetCartList';
import Button from 'components/Button';
import CartPopup from 'components/CartPopup';
import { API_PATH } from 'constants/path';

const ProductDetail = ({ name, price, imgUrl }) => {
  const { cartList, getCartList } = useGetCartList();
  const id = +useParams().id;
  const { callPostApi: postCartList, isError } = usePost(API_PATH.CART_LIST, {
    id,
    cartQuantity: 1,
  });
  const foundItem = cartList.find((item) => +item.id === +id);
  const [isInCart, setIsInCart] = useState(!!foundItem);
  const [isCartPopupShow, setIsCartPopupShow] = useState(false);

  const handleClickCart = async () => {
    await postCartList();
    getCartList();
    setIsCartPopupShow(true);

    setTimeout(() => {
      setIsCartPopupShow(false);
      setIsInCart(true);
    }, 3000);
  };

  return (
    <>
      <Styled.ProductImage src={imgUrl} alt={name} />
      <Styled.ProductInfo>
        <Styled.ProductName>{name}</Styled.ProductName>
        <Styled.Line />
        <Styled.ProductPrice>
          <p>금액</p>
          <p>{price}원</p>
        </Styled.ProductPrice>
        <Button
          colorType="secondary"
          sizeType="large"
          onClick={handleClickCart}
        >
          장바구니
        </Button>
        <CartPopup
          isCartPopupShow={isCartPopupShow}
          isInCart={isInCart}
          isError={isError}
        />
      </Styled.ProductInfo>
    </>
  );
};

ProductDetail.propTypes = {
  id: PropTypes.number,
  imgUrl: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.string,
  onClickCart: PropTypes.func,
};

const Styled = {
  ProductImage: styled.img`
    width: 350px;
    height: 350px;
    border-radius: 4px;
  `,
  ProductInfo: styled.div`
    width: 380px;
  `,
  ProductName: styled.div`
    margin: 10px 0 10px 15px;
    font-size: 18px;
    font-weight: 700;
  `,
  ProductPrice: styled.div`
    margin: 0 0 10px 15px;
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    font-weight: 400;
  `,

  Line: styled.hr`
    margin: 0;
  `,
};

export default ProductDetail;
