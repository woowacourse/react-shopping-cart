import * as Styled from './style';
import PropTypes from 'prop-types';

const ProductContainer = ({ children }) => {
  return (
    <Styled.Wrapper>
      <Styled.Container>{children}</Styled.Container>
    </Styled.Wrapper>
  );
};

ProductContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default ProductContainer;
