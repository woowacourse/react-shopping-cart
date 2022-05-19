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
  const handleChangeQuantity = ({ target }) => {
    setItemQuantity(target.valueAsNumber);
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
        <Styled.QuantityInput
          type="number"
          value={itemQuantity}
          onChange={handleChangeQuantity}
          min={1}
        />
        <Styled.Price>{parsePrice(price)}원</Styled.Price>
      </Styled.ProductInfo>
    </Styled.Wrapper>
  );
};

CartItem.propTypes = {
  id: PropTypes.number,
  imgUrl: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.string,
  quantity: PropTypes.number,
  isSelected: PropTypes.bool,
  onToggleSelect: PropTypes.func,
};

export default CartItem;
