import { styled } from 'styled-components';
import CartProductItem from '../CartProductItem/CartProductItem';
import mockData from '../../data/productList.json';
import checkIcon from '../../assets/check.svg';

const CartProductSummary = () => {
  return (
    <Wrapper>
      <ProductCountWrapper>
        <ProductCount>든든배송 상품 (3개)</ProductCount>
      </ProductCountWrapper>
      <ProductList role='list'>
        {mockData.map((product) => {
          return <CartProductItem key={product.id} {...product} />;
        })}
      </ProductList>
      <ProductSelectWrapper>
        <Label>
          <Input type='checkbox' icon={checkIcon} />
          <LabelContent>전체선택 (?/{mockData.length})</LabelContent>
        </Label>
        <ProductsDeleteButton>선택삭제</ProductsDeleteButton>
      </ProductSelectWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;

const ProductCountWrapper = styled.div`
  padding-bottom: 16px;
  border-bottom: 4px solid #aaaaaa;
`;

const ProductCount = styled.span`
  font-size: 20px;
  line-height: 33px;
  letter-spacing: 0.5px;
  color: #333333;
`;

const ProductList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  width: fit-content;
  display: flex;
  align-items: center;
`;

const Input = styled.input<{ icon: string }>`
  appearance: none;
  -webkit-appearance: none;
  width: 28px;
  height: 28px;
  border: 1px solid #22a6a2;
  border-radius: 2px;
  transform: translateY(0%);
  cursor: pointer;

  &:checked {
    background: #333333;
    border: 1px solid #3288ff;
  }

  &:after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-image: ${({ icon }) => `url(${icon})`};
    background-size: 20px;
    background-repeat: no-repeat;
    background-position: center;
  }
`;

const LabelContent = styled.span`
  margin-left: 15px;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.5px;
  color: #333333;
  cursor: pointer;
`;

const ProductsDeleteButton = styled.button`
  border: 1px solid #bbbbbb;
  padding: 8px 18px;
  background-color: #fff;
  cursor: pointer;
`;

const ProductSelectWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export default CartProductSummary;
