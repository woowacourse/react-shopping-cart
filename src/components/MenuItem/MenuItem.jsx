import styled from 'styled-components';
import PropTypes from 'prop-types';

const MenuItem = ({ children }) => {
  return <Styled.Wrapper>{children}</Styled.Wrapper>;
};

MenuItem.propTypes = {
  children: PropTypes.string,
};

const Styled = {
  Wrapper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: 24px;
    color: #ffffff;
    cursor: pointer;
  `,
};

export default MenuItem;
