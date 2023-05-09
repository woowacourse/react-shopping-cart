import styled from 'styled-components';

export const HeaderContainer = styled.header`
  width: 100%;
  height: 80px;

  background: ${(props) => props.theme.color.primary};
`;

export const HeaderContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 1320px;
  height: 80px;

  margin: 0 auto;

  color: ${(props) => props.theme.color.white};
`;

export const HeaderWrapper = styled.div<{ gap?: number }>`
  display: flex;
  align-items: center;

  gap: ${(props) => props.gap ?? 0}px;
`;

export const Logo = styled.span`
  height: 50px;
  font: ${(props) => props.theme.font.header};
`;

export const CartTitle = styled.span`
  font: 'normal 500 24px/12px Noto Sans KR';
`;

export const CartCounter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  background: ${(props) => props.theme.color.secondary};
  border-radius: 50%;
  font: normal 500 16px/12px Noto Sans KR;
`;
