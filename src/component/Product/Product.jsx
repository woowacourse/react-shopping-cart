import Button from 'component/common/Button/Button';
import styled from 'styled-components';

const ProductBox = styled.div`
  width: 282px;
  height: 358px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Image = styled.img`
  width: 282px;
  height: 282px;
  object-fit: cover;
`;

const DescriptionBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 12px;
`;

const Name = styled.p`
  font-family: 'Noto Sans KR';
  font-weight: 400;
  font-size: 16px;
  letter-spacing: 0.5px;
  color: #333333;
`;

const Price = styled.p`
  font-family: 'Noto Sans KR';
  font-weight: 400;
  font-size: 20px;
  letter-spacing: 0.5px;
  color: #333333;
`;

function Product({ image, name, price }) {
  return (
    <ProductBox>
      <Image src={image} />
      <DescriptionBox>
        <div>
          <Name>{name}</Name>
          <Price>{price} 원</Price>
        </div>
        <Button>
          <span style={{ fontSize: '25px' }}>🛒</span>
        </Button>
      </DescriptionBox>
    </ProductBox>
  );
}

export default Product;
