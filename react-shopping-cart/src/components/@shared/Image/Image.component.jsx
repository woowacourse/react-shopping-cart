import styled, { css } from 'styled-components';

const Image = styled.img`
  ${({ type }) => {
    switch (type) {
      case 'small':
        return css`
          width: 144px;
          height: 144px;
        `;

      case 'medium':
        return css`
          width: 282px;
          height: 282px;
        `;

      case 'large':
        return css`
          width: 570px;
          height: 570px;
        `;

      default:
        return css`
          width: 282px;
          height: 282px;
        `;
    }
  }}
`;

export default Image;
