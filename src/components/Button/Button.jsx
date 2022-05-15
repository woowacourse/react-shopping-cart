import styled from 'styled-components';
import PropTypes from 'prop-types';

const buttonColor = {
  primary: `background-color: #2AC1BC;`,
  secondary: `background-color: #73675C;`,
};

const buttonSize = {
  large: `
    width: 380px;
    height: 58px;
    font-size: 22px;
  `,
  medium: `
    width: 240px;
    height: 50px;
    font-size: 19px;
  `,
  small: `
    width: 100px;
    height: 35px;
    font-size: 15px;
  `,
};

const Button = ({ colorType, sizeType, children, ...rest }) => {
  return (
    <Styled.Button
      type="button"
      colorType={colorType}
      sizeType={sizeType}
      {...rest}
    >
      {children}
    </Styled.Button>
  );
};

Button.propTypes = {
  colorType: PropTypes.oneOf(Object.keys(buttonColor)),
  sizeType: PropTypes.oneOf(Object.keys(buttonSize)),
  children: PropTypes.string,
};

const Styled = {
  Button: styled.button`
    ${({ colorType, sizeType }) => `
        color: #fff;
        border: none;
        cursor: pointer;
        ${buttonColor[colorType]}
        ${buttonSize[sizeType]}
    `}
  `,
};

export default Button;
