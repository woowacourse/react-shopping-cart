import Styled from "@emotion/styled";

export const HeaderContainer = Styled.div`
  width:100%;
  height:64px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  background-color:black;
  color:white;
  padding:0 24px;
  font-size:20px;
`;

export const HeaderTitle = Styled.h2`
  font-weight:800;
`;

export const HeaderIconContainer = Styled.div`
  position: relative;
`;

export const CartBadge = Styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 19px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background: white;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  font-weight: 700;
`;

export const HeaderIcon = Styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`;
