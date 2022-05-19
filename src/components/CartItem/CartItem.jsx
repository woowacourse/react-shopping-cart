import PropTypes from 'prop-types';
import Styled from './style';
import { useState } from 'react';
import parsePrice from 'utils/parsePrice';
import smallTrashBin from 'assets/svg/smallTrashbin.svg';
import CheckBox from 'components/CheckBox/CheckBox';

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

  const handleIncrementQuantity = () => {
    setItemQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrementQuantity = () => {
    if (itemQuantity === 1) {
      return alert('최소 주문 갯수는 1개 입니다.');
    }
    setItemQuantity((prevQuantity) => prevQuantity - 1);
  };

  return (
    <Styled.Wrapper>
      <Styled.ProductPreview>
        <CheckBox id={id} onCheck={onToggleSelect} isChecked={isSelected} />
        <Styled.Image src={imgUrl} />
        <Styled.Name>{name}</Styled.Name>
      </Styled.ProductPreview>
      <Styled.ProductInfo>
        <Styled.DeleteButton>
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

        <Styled.Price>{parsePrice(price)}원</Styled.Price>
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
};

export default CartItem;
