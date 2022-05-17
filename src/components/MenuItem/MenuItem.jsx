import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const MenuItem = ({ children, to }) => {
  return <Styled.Menu to={to}>{children}</Styled.Menu>;
};

MenuItem.propTypes = {
  children: PropTypes.string,
  to: PropTypes.string,
};

const Styled = {
  Menu: styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    color: #ffffff;
    cursor: pointer;
    text-decoration-line: none;

    ${({ theme }) => `
      font-weight: 900;
      @media ${theme.DEVICE.EXTRA_SMALL} {
        font-size: 14px;
      }
      @media ${theme.DEVICE.MOBILE} {
        font-size: 20px;
      }
      @media ${theme.DEVICE.TABLET} {
        font-size: 20px;
      }
      @media ${theme.DEVICE.LAPTOP} {
        font-size: 24px;
      }
    `}
  `,
};

export default MenuItem;
