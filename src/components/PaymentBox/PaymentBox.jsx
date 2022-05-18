import Styled from './style';
import PropTypes from 'prop-types';
import Button from 'components/Button/Button';

// props 로 받아야 할 것
// - 총 결제 금액
// 총 결제 개수

const PaymentBox = () => {
  return (
    <Styled.Wrapper>
      <Styled.TitleBar>
        <Styled.TitleText>결제 금액</Styled.TitleText>
      </Styled.TitleBar>
      <Styled.PaymentInfo>
        <Styled.Text>총 결제 금액</Styled.Text>
        <Styled.Text>325,600</Styled.Text>
      </Styled.PaymentInfo>
      <Button colorType="primary" sizeType="medium">
        결제하기
      </Button>
    </Styled.Wrapper>
  );
};

PaymentBox.propTypes = {
  imgUrl: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.string,
  quantity: PropTypes.number,
};

export default PaymentBox;
