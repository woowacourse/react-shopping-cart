import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import Image from 'components/shared/image/Image';
import ShoppingCartIcon from 'components/shared/icon/ShoppingCartIcon';
import Modal from 'components/shared/modal/Modal';
import { PUT } from 'modules/reducer';
import store from 'app/store';
import Button from 'components/shared/button/Button';

import { ReactComponent as PlusIcon } from 'assets/plus_icon.svg';
import { ReactComponent as MinusIcon } from 'assets/minus_icon.svg';
import Text from './shared/text/Text';

const StyledProductItem = styled.div`
  width: 282px;
  position: relative;
`;

const StyledProductContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 75px;
  padding: 0 15px;
`;

const StyledProductText = styled.p`
  font-weight: 400;
  letter-spacing: 0.5px;
  color: #333333;

  ${props =>
    props.name &&
    css`
      font-size: 16px;
      line-height: 22px;
    `}

  ${props =>
    props.price &&
    css`
      font-size: 20px;
      line-height: 27px;
    `}
`;

const ProductItem = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { products } = useSelector(state => state.reducer);
  const { name, price, image } = products.find(product => product.id === id);
  const [quantity, setQuantity] = useState(1);

  const handleClick = () => {
    if (isOpen) {
      setIsOpen(false);
      store.dispatch({ type: PUT, id, quantity });
      return;
    }

    if (!isOpen) {
      setIsOpen(true);
    }
  };

  return (
    <StyledProductItem>
      <Image src={image} />
      <StyledProductContainer>
        <div>
          <StyledProductText name="true">{name}</StyledProductText>
          <StyledProductText price="true">{price}원</StyledProductText>
        </div>
        <div>
          <ShoppingCartIcon onClick={handleClick} />
        </div>
      </StyledProductContainer>
      {isOpen && (
        <Modal>
          <Button
            onClick={() => {
              setQuantity(prev => (prev > 1 ? prev - 1 : prev));
            }}
          >
            <MinusIcon />
          </Button>
          <Text modal="true">{quantity}</Text>
          <Button onClick={() => setQuantity(prev => prev + 1)}>
            <PlusIcon />
          </Button>
        </Modal>
      )}
    </StyledProductItem>
  );
};

export default ProductItem;
