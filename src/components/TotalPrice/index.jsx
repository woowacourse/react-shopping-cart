import PropTypes from 'prop-types';
import UnderlineText from 'components/UnderlineText';
import autoComma from 'utils/autoComma';
import Styled from 'components/TotalPrice/index.style';

const TotalPrice = ({ title, price, action }) => {
  return (
    <Styled.Container>
      <Styled.Header>{title}</Styled.Header>

      <Styled.Body>
        <Styled.PriceContainer>
          <UnderlineText text={title} />
          <UnderlineText text={`${autoComma(price)}원`} />
        </Styled.PriceContainer>

        <Styled.ButtonContainer>
          <Styled.Action>{action}</Styled.Action>
        </Styled.ButtonContainer>
      </Styled.Body>
    </Styled.Container>
  );
};

TotalPrice.propTypes = {
  /**
   * 해당 컴포넌트에 표시되는 제목
   */
  title: PropTypes.string.isRequired,
  /**
   * 가격을 보여주는 곳
   */
  price: PropTypes.number.isRequired,
  /**
   * 버튼에 쓰일 텍스트
   */
  action: PropTypes.string.isRequired,
};

export default TotalPrice;
