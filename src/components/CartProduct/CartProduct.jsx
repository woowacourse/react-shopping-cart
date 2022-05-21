import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Button } from 'components/@common';
import { Selector } from 'components';

import { addThousandUnitComma } from 'utils';

const CartProductBox = styled.div`
  width: 736px;
  display: flex;
  justify-content: space-between;
`;

const LeftBox = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 10px;
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
  color: #333333;
`;

const RightBox = styled.div`
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
  border: 1px solid #dddddd;
  font-size: 24px;
`;

const QuantityControlButton = styled.div`
  height: 30px;
  padding: 4px 12px;
  border: 1px solid #dddddd;
  background: white;
  font-size: 100%;

  &:focus {
    outline: none;
  }
`;

const Price = styled.p`
  font-weight: 400;
  letter-spacing: 0.5px;
  color: #333333;
`;

function CartProduct({ image, name, quantity, price }) {
  return (
    <CartProductBox>
      <LeftBox>
        <Selector />
        <Image src={image} />
        <Name>{name}</Name>
      </LeftBox>
      <RightBox>
        <Button>
          <DeleteButton>🗑</DeleteButton>
        </Button>
        <QuantityBox>
          <Quantity>{quantity}</Quantity>
          <Button>
            <QuantityControlButton>▲</QuantityControlButton>
            <QuantityControlButton>▼</QuantityControlButton>
          </Button>
        </QuantityBox>
        <Price>{addThousandUnitComma(price)}원</Price>
      </RightBox>
    </CartProductBox>
  );
}

CartProduct.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
};

export default CartProduct;
