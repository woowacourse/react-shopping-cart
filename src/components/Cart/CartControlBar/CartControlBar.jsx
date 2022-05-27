import * as Styled from './style';
import CheckBox from 'components/Common/CheckBox/CheckBox';
import PropTypes from 'prop-types';

const CartControlBar = ({
  isChecked,
  onControlToggleCheck,
  onControlClickButton,
}) => {
  return (
    <Styled.Wrapper>
      <Styled.LeftBox>
        <CheckBox checkedStatus={isChecked} onCheck={onControlToggleCheck} />
        <span>전체 선택 / 해제</span>
      </Styled.LeftBox>
      <Styled.Button onClick={onControlClickButton}>
        선택 상품 삭제
      </Styled.Button>
    </Styled.Wrapper>
  );
};

CartControlBar.propTypes = {
  isChecked: PropTypes.bool,
  onControlToggleCheck: PropTypes.func,
  onControlClickButton: PropTypes.func,
};

export default CartControlBar;
