import styled, { css } from 'styled-components';

export const Button = styled.button<{
  view: 'white' | 'black';
}>`
  padding: 0;

  cursor: pointer;

  ${({ view }) => {
    switch (view) {
      case 'white': {
        return css`
          background-color: white;
          border: 1px solid #bbbbbb;
          color: #333333;
        `;
      }
      case 'black': {
        return css`
          background-color: #333333;
          border: 1px solid #333333;
          color: white;
        `;
      }
    }
  }}
`;

export const ExtraSmallButton = styled(Button)`
  width: 2.4rem;
  height: 1.4rem;
`;

export const SmallButton = styled(Button)`
  width: 4.2rem;
  height: 3rem;
`;

export const MediumButton = styled(Button)`
  width: 9.8rem;
  height: 3.5rem;

  font-weight: 400;
  font-size: 16px;
`;

export const LargeButton = styled(Button)`
  width: 38.8rem;
  height: 7.3rem;

  font-weight: 400;
  font-size: 24px;
`;
