import { CartItems } from '../../types/Item';
import styled from 'styled-components';

const CardContainer = styled.li`
  display: flex;
  flex-direction: column;
  padding: 1rem 0 0 0;
  gap: 1rem;
  border-color: rgba(0, 0, 0, 0.1);
  border-width: 0.5px 0 0 0;
  border-style: solid;
`;

const CardContent = styled.div`
  display: flex;
  gap: 2.4rem;
`;

const ItemImg = styled.img`
  width: 11.2rem;
  height: 11.2rem;
`;

const CardDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  margin: 0.9rem 0;
  box-sizing: border-box;
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  width: 100%;
`;

const ProductName = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1.5rem;
`;

const ProductPrice = styled.p`
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 3.47rem;
`;

const QuantityCount = styled(ProductName)``;

interface ProductProps {
  item: CartItems;
}

function ConfirmItemCard({ item }: ProductProps) {
  return (
    <CardContainer>
      <CardContent>
        <ItemImg src={item.product.imageUrl} alt={`${item.product.name}사진`} />
        <CardDetail>
          <CardInfo>
            <ProductName>{item.product.name}</ProductName>
            <ProductPrice>{item.product.price.toLocaleString()}원</ProductPrice>
          </CardInfo>

          <QuantityCount>{`${item.quantity}개`}</QuantityCount>
        </CardDetail>
      </CardContent>
    </CardContainer>
  );
}

export default ConfirmItemCard;
