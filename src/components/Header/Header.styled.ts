import styled from 'styled-components';

interface HeaderIconStyleProps {
  $width: string;
}

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-left: 3rem;
  background-color: #000000;
  width: 100%;
  height: 6.4rem;
`;

export const HeaderIcon = styled.img<HeaderIconStyleProps>`
  width: ${(props) => props.$width};
  aspect-ratio: 1;
`;
