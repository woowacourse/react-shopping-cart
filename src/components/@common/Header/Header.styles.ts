import styled from 'styled-components';

export const HeaderContainer = styled.header`
  width: 100%;
  height: 80px;

  position: fixed;
  top: 0;

  background: ${(props) => props.theme.color.white};
  border-bottom: 1px solid rgba(220, 223, 225, 0.7);

  z-index: 99;
`;

export const HeaderContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 90%;
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
  background: linear-gradient(to right, #fed777, #ff946f);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (min-width: 212px) and (max-width: 532px) {
    display: none;
  }
`;

export const MobileLogo = styled.button`
  width: 60px;
  height: 60px;
  @media (min-width: 212px) and (max-width: 532px) {
    background-image: url(https://storage.googleapis.com/sticker-prod/7xQJqnltYx72OYNjUAM2/17-1.png);
    background-size: contain;
  }
`;

export const CartTitle = styled.span`
  font: normal 500 24px/12px BM-HANNA;
  color: black;
`;

export const CartCounter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  background: ${(props) => props.theme.color.secondary};
  border-radius: 50%;
  font: normal 500 16px/12px BM-HANNA;
`;
