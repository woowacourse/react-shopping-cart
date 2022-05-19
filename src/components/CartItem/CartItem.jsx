import PropTypes from 'prop-types';
import Styled from './style';
import { useState } from 'react';
import parsePrice from 'utils/parsePrice';
import smallTrashBin from 'assets/svg/smallTrashbin.svg';
import CheckBox from 'components/CheckBox/CheckBox';
import { MESSAGE } from 'constants';

const CartItem = ({
  id,
  imgUrl,
  name,
  price,
  quantity,
  isSelected,
  onToggleSelect,
  onChangeQuantity,
  onDeleteItem,
}) => {
  const [itemQuantity, setItemQuantity] = useState(quantity);

  const handleIncrementQuantity = () => {
    setItemQuantity((prevQuantity) => {
      onChangeQuantity(prevQuantity + 1);
      return prevQuantity + 1;
    });
  };

  const handleDecrementQuantity = () => {
    if (itemQuantity === 1) {
      alert(MESSAGE.MINIMUM_CART_LENGTH);
      return;
    }
    setItemQuantity((prevQuantity) => {
      onChangeQuantity(prevQuantity - 1);
      return prevQuantity - 1;
    });
  };

  return (
    <Styled.Wrapper>
      <Styled.ProductPreview>
        <CheckBox id={id} onCheck={onToggleSelect} checkedStatus={isSelected} />
        <Styled.Image src={imgUrl} />
        <Styled.Name>{name}</Styled.Name>
      </Styled.ProductPreview>
      <Styled.ProductInfo>
        <Styled.DeleteButton onClick={onDeleteItem}>
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
