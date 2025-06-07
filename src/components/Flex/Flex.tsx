import { ElementType, HTMLAttributes } from "react";
import * as S from "./Flex.styles";
import { css } from "@emotion/react";

interface FlexProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
}

export default function Flex({ as = "div", children, ...props }: FlexProps) {
  return (
    <S.Flex as={as} {...props}>
      {children}
    </S.Flex>
  );
}

export function SpaceBetweenFlex({ as = "div", children, ...props }: FlexProps) {
  return (
    <S.Flex
      as={as}
      css={css`
        align-items: center;
        justify-content: space-between;
      `}
      {...props}
    >
      {children}
    </S.Flex>
  );
}
