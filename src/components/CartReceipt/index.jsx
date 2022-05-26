import PropTypes from 'prop-types';

import Button from 'components/@common/Button/styles';

import { COLORS } from 'styles/theme';
import * as CommonStyled from 'components/@common/CommonStyle/styles';
import * as Styled from './styles';

const CartReceipt = ({ totalPrice, checkboxItemCount }) => (
  <Styled.CartListReceiptContainer>
    <CommonStyled.FlexWrapper padding="1.5rem">
      <CommonStyled.Text>결제예상금액</CommonStyled.Text>
    </CommonStyled.FlexWrapper>
    <CommonStyled.HR margin="0" />
    <CommonStyled.FlexWrapper flexDirection="column" padding="1.5rem">
      <CommonStyled.FlexWrapper justifyContent="space-between">
        <CommonStyled.Text weight="bold" size="0.8rem">
          결제예상금액
        </CommonStyled.Text>
        <CommonStyled.Text weight="bold" size="0.8rem">
          {totalPrice ? totalPrice.toLocaleString('ko-KR') : 0}원
        </CommonStyled.Text>
      </CommonStyled.FlexWrapper>
      {checkboxItemCount === 0 ? (
        <Button
          height="60px"
          margin="3rem 0 0 0"
          size="1.2rem"
          weight="normal"
          cursor="not-allowed"
          backgroundColor={COLORS.GRAY_100}
          color={COLORS.GRAY_300}
          hoverColor={COLORS.GRAY_100}
        >
          주문하기({checkboxItemCount || 0}종)
        </Button>
      ) : (
        <Button height="60px" margin="3rem 0 0 0" size="1.2rem" weight="normal">
          주문하기({checkboxItemCount || 0}종)
        </Button>
      )}
    </CommonStyled.FlexWrapper>
  </Styled.CartListReceiptContainer>
);

CartReceipt.propTypes = {
  totalPrice: PropTypes.number,
  checkboxItemCount: PropTypes.number,
};

CartReceipt.defaultProps = {
  totalPrice: 0,
  checkboxItemCount: 0,
};

export default CartReceipt;
