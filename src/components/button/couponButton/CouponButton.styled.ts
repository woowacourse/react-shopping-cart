import styled from "styled-components";

export const StyledCouponButton = styled.button`
  width: 100%;
  height: 48px;
  border-radius: 5px;
  border: 1px solid rgba(51, 51, 51, 0.25);
  background: rgba(255, 255, 255, 1);
  margin-top: 32px;

  font-family: Noto Sans KR;
  font-size: 15px;
  font-weight: 700;
  line-height: 21.72px;
  text-align: center;
  align-items: center;
  color: rgba(51, 51, 51, 0.75);

  cursor: pointer;

  &:focus {
    outline: none;
  }
`;
