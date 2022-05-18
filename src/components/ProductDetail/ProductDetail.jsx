import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import { useNavigate } from 'react-router-dom';
import { PATH } from 'constants/path';
import { useParams } from 'react-router-dom';

import usePost from 'hooks/usePost';

const ProductDetail = ({ imgUrl, name, price }) => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { isLoading, isError, callApi } = usePost('/cartList', {
    id,
    cartQuantity: 1,
  });

  const handleClickCart = () => {
    callApi();

    // TODO isError의 최신 상태를 받아오지 못하고 있다.
    if (!isError) navigate(PATH.CART);
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
        {isLoading && '전송 중'}
        {isError && '에러가 발생했습니다'}
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
