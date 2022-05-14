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
    color: #ffffff;
    cursor: pointer;
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
