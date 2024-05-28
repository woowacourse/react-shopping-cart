import styled, { CSSProperties, css } from "styled-components";
import { CaptionTheme } from "./Caption.type";

const CAPTION_THEME: Record<CaptionTheme, CSSProperties["color"]> = {
  info: "#000000",
  warning: "#FF5722",
};

const CaptionText = styled.span<{ $theme: CaptionTheme }>`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  line-height: 15px;

  ${({ $theme }) => css`
    color: ${CAPTION_THEME[$theme]};
  `}
`;

const Styled = {
  CaptionText,
};

export default Styled;
