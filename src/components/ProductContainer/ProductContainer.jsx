import styled from 'styled-components';
import PropTypes from 'prop-types';

const ProductContainer = ({ children }) => {
  return <Styled.Container>{children}</Styled.Container>;
};

const Styled = {
  Container: styled.section`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    padding: 50px 240px;
  `,
};

ProductContainer.propTypes = {
  children: PropTypes.element,
};

export default ProductContainer;
