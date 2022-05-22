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
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  action: PropTypes.string.isRequired,
};

export default TotalPrice;
