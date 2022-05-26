import styled from 'styled-components';

const CartProduct = styled.div`
  width: 736px;
  display: flex;
  justify-content: space-between;
  padding: 25px 0;
  border-top: 1.5px solid ${props => props.theme.colors.gray_600};
`;

const LeftPart = styled.div`
  display: flex;
  gap: 15px;
`;

const Image = styled.img`
  width: 144px;
  height: 144px;
  object-fit: cover;
`;

const Name = styled.p`
  font-weight: 400;
  font-size: 20px;
  letter-spacing: 0.5px;
  color: ${props => props.theme.colors.gray_900};
`;

const RightPart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  gap: 15px;
`;

const DeleteButton = styled.div`
  font-size: 20px;
`;

const QuantityBox = styled.div`
  display: flex;
`;

const Quantity = styled.div`
  width: 72px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${props => props.theme.colors.gray_500};
  font-size: 24px;
`;

const QuantityControlButton = styled.div`
  height: 30px;
  padding: 4px 12px;
  border: 1px solid ${props => props.theme.colors.gray_500};
  background: ${props => props.theme.colors.white};
  font-size: 100%;

  &:focus {
    outline: none;
  }
`;

const Price = styled.p`
  font-weight: 400;
  letter-spacing: 0.5px;
  color: ${props => props.theme.colors.gray_900};
`;

export {
  CartProduct,
  LeftPart,
  Image,
  Name,
  RightPart,
  DeleteButton,
  QuantityBox,
  Quantity,
  QuantityControlButton,
  Price,
};
