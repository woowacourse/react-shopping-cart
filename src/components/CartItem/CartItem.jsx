import PropTypes from 'prop-types';
import Styled from './style';
import { useEffect, useState } from 'react';
import { parsePrice } from 'utils';
import { MESSAGE } from 'constants';
import smallTrashBin from 'assets/svg/smallTrashbin.svg';
import CheckBox from 'components/CheckBox/CheckBox';
import useCart from 'hooks/useCart';

const CartItem = ({
  id,
  imgUrl,
  name,
  price,
  quantity,
  isSelected,
  onToggleSelect,
}) => {
  const [itemQuantity, setItemQuantity] = useState(quantity);
  const { updateItemQuantity, deleteItem } = useCart();

  useEffect(() => {
    if (quantity !== itemQuantity) {
      updateItemQuantity(id, itemQuantity);
    }
  }, [itemQuantity]);

  const handleIncrementQuantity = () => {
    setItemQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrementQuantity = () => {
    try {
      if (itemQuantity === 1) throw new Error(MESSAGE.MINIMUM_CART_LENGTH);
      setItemQuantity((prevQuantity) => prevQuantity - 1);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDeleteItem = (id) => () => {
    deleteItem(id);
  };

  return (
    <Styled.Wrapper>
      <Styled.ProductPreview>
        <CheckBox onCheck={onToggleSelect} checkedStatus={isSelected} />
        <Styled.Image src={imgUrl} alt={name} loading="lazy" />
        <Styled.Name>{name}</Styled.Name>
      </Styled.ProductPreview>
      <Styled.ProductInfo>
        <Styled.DeleteButton onClick={handleDeleteItem(id)}>
          <Styled.TrashBinSvg src={smallTrashBin} alt="상품 삭제 버튼" />
        </Styled.DeleteButton>
        <Styled.Quantity>
          <Styled.QuantityControlButton onClick={handleIncrementQuantity}>
            +
          </Styled.QuantityControlButton>
          <span>{itemQuantity}</span>
          <Styled.QuantityControlButton onClick={handleDecrementQuantity}>
            -
          </Styled.QuantityControlButton>
        </Styled.Quantity>
        <Styled.Price>{parsePrice(itemQuantity * price)}원</Styled.Price>
      </Styled.ProductInfo>
    </Styled.Wrapper>
  );
};

CartItem.propTypes = {
  id: PropTypes.number,
  imgUrl: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number,
  isSelected: PropTypes.bool,
  onToggleSelect: PropTypes.func,
  onChangeQuantity: PropTypes.func,
  onDeleteItem: PropTypes.func,
};

export default CartItem;
