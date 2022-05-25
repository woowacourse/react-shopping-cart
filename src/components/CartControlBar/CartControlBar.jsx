import Styled from './style';
import CheckBox from 'components/CheckBox/CheckBox';
import PropTypes from 'prop-types';

const CartControlBar = ({
  isAllSelected,
  onControlSelectAll,
  onControlDelete,
}) => {
  return (
    <Styled.Wrapper>
      <Styled.FieldSet>
        <CheckBox
          id="total"
          checkedStatus={isAllSelected}
          onCheck={onControlSelectAll}
        />
        <span>전체 선택 / 해제</span>
      </Styled.FieldSet>
      <Styled.DeleteButton onClick={onControlDelete}>
        선택 상품 삭제
      </Styled.DeleteButton>
    </Styled.Wrapper>
  );
};

CartControlBar.propTypes = {
  isAllSelected: PropTypes.bool,
  onControlSelectAll: PropTypes.func,
  onControlDelete: PropTypes.func,
};

export default CartControlBar;
