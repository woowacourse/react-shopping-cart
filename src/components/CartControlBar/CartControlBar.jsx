import Styled from './style';
import CheckBox from 'components/CheckBox/CheckBox';
import PropTypes from 'prop-types';

const CartControlBar = ({
  isAllSelected,
  onToggleSelect,
  onClickDeleteButton,
}) => {
  return (
    <Styled.Wrapper>
      <Styled.FieldSet>
        <CheckBox
          id="total"
          onCheck={onToggleSelect}
          isChecked={isAllSelected}
        />
        <span>전체 선택 / 해제</span>
      </Styled.FieldSet>
      <Styled.DeleteButton onClick={onClickDeleteButton}>
        상품삭제
      </Styled.DeleteButton>
    </Styled.Wrapper>
  );
};

CartControlBar.propTypes = {
  isAllSelected: PropTypes.bool,
  onToggleSelect: PropTypes.func,
  onClickDeleteButton: PropTypes.func,
};

export default CartControlBar;
