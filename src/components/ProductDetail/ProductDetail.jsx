import { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropType from 'prop-types';
import { BasicButton, BasicImage } from '../shared/basics';

function ProductDetail({ src, title, price, isStored }) {
  const [isClicked, setIsClicked] = useState(isStored);

  const handleCartButtonClick = () => {
    setIsClicked((prev) => !prev);
  };

  useEffect(() => {
    setIsClicked((prev) => !prev);
  }, [isStored]);

  return (
    <Style.ProductDetailBox>
      <Style.ProductDetailImage size="large" src={src} alt={title} />
      <Style.ProductDetailInfo>
        <Style.ProductDetailTitle>{title}</Style.ProductDetailTitle>
        <Style.DivideLine />
        <Style.ProductDetailPriceWrapper>
          <span>금액</span>
          <Style.ProductDetailPrice>{`${price}원`}</Style.ProductDetailPrice>
        </Style.ProductDetailPriceWrapper>
      </Style.ProductDetailInfo>
      <Style.ProductDetailCartButton onClick={handleCartButtonClick}>
        {isClicked ? '장바구니 취소' : '장바구니 담기'}
      </Style.ProductDetailCartButton>
    </Style.ProductDetailBox>
  );
}

ProductDetail.propTypes = {
  src: PropType.string.isRequired,
  title: PropType.string.isRequired,
  price: PropType.string.isRequired,
  isStored: PropType.bool.isRequired,
};

export default ProductDetail;

const Style = {
  ProductDetailContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-top: 50px;
  `,
  ProductDetailBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 520px;
  `,
  ProductDetailImage: styled(BasicImage)`
    margin-bottom: 10px;
  `,
  ProductDetailInfo: styled.div`
    width: 100%;
  `,
  ProductDetailTitle: styled.span`
    font-size: 24px;
  `,
  ProductDetailPriceWrapper: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  ProductDetailPrice: styled.span`
    font-size: 24px;
  `,
  ProductDetailCartButton: styled(BasicButton)`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    width: 100%;
    padding: 24px;
    background: #73675c;
    border-bottom: 6px solid #6d4c2da4;
    font-size: 24px;
    color: white;
    border-radius: 4px;
    &:active {
      margin-top: 25px;
      border-bottom-width: 0px;
    }
  `,
  DivideLine: styled.hr`
    width: 100%;
    margin: 20px 0;
    border: 2px solid #aaaaaa;
  `,
};
