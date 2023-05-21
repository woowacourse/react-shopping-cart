import styled from 'styled-components';

export const HeaderContainer = styled.header`
  width: 100%;
  height: 80px;

  position: fixed;
  top: 0;

  padding: 0 40px;

  background: ${(props) => props.theme.color.white};
  border-bottom: 1px solid rgba(220, 223, 225, 0.7);
`;

export const HeaderContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
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
  cursor: pointer;
  @media (min-width: 320px) and (max-width: 479px) {
    display: none;
  }
`;

export const LogoIcon = styled.button`
  width: 48px;
  height: 48px;
  @media (min-width: 320px) and (max-width: 479px) {
    background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' standalone='no'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 20010904//EN' 'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3E%3Csvg version='1.0' xmlns='http://www.w3.org/2000/svg' width='250.000000pt' height='250.000000pt' viewBox='0 0 250.000000 250.000000' preserveAspectRatio='xMidYMid meet'%3E%3Cg transform='translate(0.000000,250.000000) scale(0.100000,-0.100000)'%0Afill='%23000000' stroke='none'%3E%3Cpath d='M715 2081 c-38 -7 -75 -23 -99 -42 -6 -5 -31 -24 -56 -42 -29 -21%0A-46 -42 -48 -57 -2 -14 -7 -34 -12 -45 -4 -11 -11 -27 -13 -37 -7 -19 18 -117%0A32 -131 13 -13 -19 -56 -101 -141 -32 -33 -58 -65 -58 -72 0 -7 -4 -14 -8 -16%0A-9 -4 -68 -157 -81 -213 -18 -77 -22 -172 -11 -241 14 -84 56 -226 80 -274 20%0A-38 206 -218 273 -263 94 -63 225 -111 412 -152 68 -15 339 -14 410 1 79 17%0A255 69 300 88 17 8 47 19 68 26 21 7 77 34 123 62 62 36 92 61 116 96 17 26%0A46 64 63 85 54 63 156 348 161 448 7 142 -79 385 -160 457 -45 39 -47 50 -18%0A97 41 64 42 137 4 218 -33 70 -58 93 -147 133 -47 22 -64 25 -103 19 -69 -10%0A-138 -39 -178 -75 -27 -23 -42 -30 -58 -25 -84 26 -451 27 -551 1 -83 -22 -86%0A-21 -120 25 -16 23 -42 47 -56 54 -33 18 -113 25 -164 16z m132 -64 c21 -12%0A78 -78 85 -99 4 -12 102 -1 188 22 69 18 427 8 470 -14 45 -22 50 -21 90 20%0A41 42 107 73 170 81 38 4 54 0 102 -28 45 -26 62 -43 82 -83 38 -76 36 -131%0A-9 -183 -33 -39 -45 -73 -26 -73 5 0 11 -12 15 -27 3 -17 19 -36 38 -48 18%0A-11 37 -30 43 -41 6 -12 16 -29 23 -37 18 -21 60 -146 77 -228 20 -95 19 -144%0A-6 -209 -11 -30 -29 -84 -39 -120 -26 -95 -62 -168 -109 -225 -22 -27 -41 -55%0A-41 -62 0 -7 -15 -23 -32 -36 -151 -113 -534 -237 -708 -230 -276 11 -474 63%0A-616 162 -85 59 -243 215 -261 258 -25 59 -62 199 -69 262 -11 100 27 275 84%0A387 11 22 47 67 80 100 32 33 71 79 87 102 l28 43 -28 54 c-20 40 -25 62 -21%0A82 4 16 10 40 13 55 4 21 23 40 72 72 36 24 77 46 91 49 49 9 105 6 127 -6z'/%3E%3Cpath d='M962 1380 c-32 -13 -37 -36 -19 -76 22 -45 59 -55 93 -23 60 56 5%0A130 -74 99z'/%3E%3Cpath d='M1382 1364 c-27 -19 -29 -64 -4 -87 60 -55 149 26 92 83 -24 24 -57%0A26 -88 4z'/%3E%3Cpath d='M896 1213 c-13 -13 -4 -35 29 -71 19 -22 32 -41 30 -44 -3 -3 -9 -25%0A-13 -48 -6 -34 -14 -47 -37 -60 -20 -11 -29 -23 -27 -36 6 -32 15 -34 61 -13%0A35 15 50 17 80 9 24 -6 58 -6 98 0 56 9 65 8 119 -17 63 -29 115 -33 163 -13%0A25 10 34 9 52 -4 17 -11 26 -13 36 -4 19 16 16 32 -11 57 -13 12 -26 37 -28%0A55 -3 29 0 35 27 46 48 21 56 30 44 51 -12 23 -30 24 -70 4 -29 -16 -31 -15%0A-73 22 -24 21 -52 39 -62 39 -11 1 -48 6 -84 12 -76 13 -128 7 -187 -19 -52%0A-23 -55 -23 -70 0 -12 20 -67 44 -77 34z m338 -73 c115 -19 190 -106 139 -162%0A-22 -25 -44 -23 -124 12 -66 30 -71 30 -135 19 -48 -8 -72 -8 -90 0 -52 23%0A-15 98 61 125 49 18 73 19 149 6z'/%3E%3C/g%3E%3C/svg%3E%0A");
    background-size: contain;
    cursor: pointer;
  }
`;

export const CartRouteButton = styled.button`
  cursor: pointer;
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
