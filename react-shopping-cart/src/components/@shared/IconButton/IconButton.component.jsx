import styled, { css } from 'styled-components';

const IconButtonContainer = styled.button`
  ${({ size }) => {
    switch (size) {
      case 'small':
        return css`
          width: 24px;
          height: 24px;
        `;
      case 'medium':
        return css`
          width: 30px;
          height: 26px;
        `;
      default:
        return css`
          width: 30px;
          height: 26px;
        `;
    }
  }}
`;

const Icon = styled.img`
  ${({ size }) => {
    switch (size) {
      case 'small':
        return css`
          width: 24px;
          height: 24px;
        `;
      case 'medium':
        return css`
          width: 30px;
          height: 26px;
        `;
      default:
        return css`
          width: 30px;
          height: 26px;
        `;
    }
  }}
`;

function IconButton({ size, imageUrl }) {
  return (
    <IconButtonContainer type="button" size={size}>
      <Icon src={imageUrl} size={size} />
    </IconButtonContainer>
  );
}
export default IconButton;
