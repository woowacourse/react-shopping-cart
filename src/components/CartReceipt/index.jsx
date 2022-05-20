import PropTypes from 'prop-types';
import React from 'react';
import Button from 'components/@common/Button/styles';
import * as CommonStyled from 'components/@common/CommonStyle/styles';
import * as Styled from './styles';

const CartReceipt = ({ totalPrice, checkedListCount }) => (
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
          {totalPrice.toLocaleString('ko-KR')}원
        </CommonStyled.Text>
      </CommonStyled.FlexWrapper>
      <Button height="60px" margin="3rem 0 0 0" size="1.2rem" weight="normal">
        주문하기({checkedListCount}종)
      </Button>
    </CommonStyled.FlexWrapper>
  </Styled.CartListReceiptContainer>
);

CartReceipt.propTypes = {
  totalPrice: PropTypes.number,
  checkedListCount: PropTypes.number,
};

CartReceipt.defaultProps = {
  totalPrice: 0,
  checkedListCount: 0,
};

export default CartReceipt;
