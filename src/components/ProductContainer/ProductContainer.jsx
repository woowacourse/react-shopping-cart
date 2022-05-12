import styled from 'styled-components';
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

const Styled = {
  Wrapper: styled.div`
    display: flex;
    justify-content: center;
  `,

  Container: styled.section`
    max-width: 1020px;
    padding: 0;
    margin: 40px 0;
    display: grid;
    gap: 30px 36px;

    @media (max-width: 600px) {
      grid-template-columns: repeat(1, 1fr);
    }

    @media (min-width: 600px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 992px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (min-width: 1200px) {
      grid-template-columns: repeat(4, 1fr);
    }
  `,
};

export default ProductContainer;
