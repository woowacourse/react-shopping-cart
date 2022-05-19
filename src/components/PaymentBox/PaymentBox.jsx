import Styled from './style';
import PropTypes from 'prop-types';
import Button from 'components/Button/Button';

const PaymentBox = ({ price, quantity }) => {
  return (
    <Styled.Wrapper>
      <Styled.TitleBar>
        <Styled.TitleText>결제 금액</Styled.TitleText>
      </Styled.TitleBar>
      <Styled.PaymentInfo>
        <Styled.Text>총 결제 금액</Styled.Text>
        <Styled.Text>{price}</Styled.Text>
      </Styled.PaymentInfo>
      <Button colorType="primary" sizeType="medium">
        결제하기 ({quantity}개)
      </Button>
    </Styled.Wrapper>
  );
};

PaymentBox.propTypes = {
  price: PropTypes.number,
  quantity: PropTypes.number,
};

export default PaymentBox;
