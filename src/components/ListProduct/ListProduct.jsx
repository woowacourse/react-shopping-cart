import styled from 'styled-components';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import ACTION_TYPE from 'redux/cart/cartActions';

import { Button } from 'components/@common';

import { addThousandUnitComma } from 'utils';

const ListProductBox = styled.div`
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
  font-weight: 400;
  font-size: 16px;
  letter-spacing: 0.5px;
  color: var(--gray-900);
`;

const Price = styled.p`
  font-weight: 400;
  font-size: 20px;
  letter-spacing: 0.5px;
  color: var(--gray-900);
`;

const ShoppingCartIcon = styled.span`
  font-size: 25px;
  transition: font-size 0.1s ease;

  &:hover {
    font-size: 35px;
  }
`;

function ListProduct({ id, image, name, price }) {
  const dispatch = useDispatch();

  const onClickShoppingCartIcon = () => {
    dispatch({ type: ACTION_TYPE.ADD_PRODUCT_TO_CART, payload: { id, image, name, price } });
  };

  return (
    <ListProductBox>
      <Image src={image} />
      <DescriptionBox>
        <div>
          <Name>{name}</Name>
          <Price>{addThousandUnitComma(price)} 원</Price>
        </div>
        <Button onClick={onClickShoppingCartIcon}>
          <ShoppingCartIcon>🛒</ShoppingCartIcon>
        </Button>
      </DescriptionBox>
    </ListProductBox>
  );
}

ListProduct.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default ListProduct;
