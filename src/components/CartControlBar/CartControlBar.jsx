import Styled from './style';
import CheckBox from 'components/CheckBox/CheckBox';
import PropTypes from 'prop-types';

const CartControlBar = ({
  isSelectedAll,
  handleSelectAll,
  onClickDeleteButton,
}) => {
  return (
    <Styled.Wrapper>
      <Styled.FieldSet>
        <CheckBox
          id="total"
          checkedStatus={isSelectedAll}
          onCheck={handleSelectAll}
        />
        <span>전체 선택 / 해제</span>
      </Styled.FieldSet>
      <Styled.DeleteButton onClick={onClickDeleteButton}>
        선택 상품 삭제
      </Styled.DeleteButton>
    </Styled.Wrapper>
  );
};

CartControlBar.propTypes = {
  isSelectedAll: PropTypes.bool,
  handleSelectAll: PropTypes.func,
  onClickDeleteButton: PropTypes.func,
};

export default CartControlBar;
