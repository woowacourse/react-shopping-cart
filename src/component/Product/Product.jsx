import Button from 'component/common/Button/Button';
import styled from 'styled-components';

const ProductContainer = styled.div`
  width: 282px;
  height: 358px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Image = styled.div`
  width: 282px;
  height: 282px;
  background-color: pink;
`;

const DescriptionContainer = styled.div`
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

function Product() {
  return (
    <ProductContainer>
      <Image />
      <DescriptionContainer>
        <div>
          <Name>PET보틀-정사각(420ml)</Name>
          <Price>43,400 원</Price>
        </div>
        <Button>
          <span style={{ fontSize: '25px' }}>🛒</span>
        </Button>
      </DescriptionContainer>
    </ProductContainer>
  );
}

export default Product;
