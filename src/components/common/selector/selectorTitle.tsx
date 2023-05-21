import styled from "styled-components";
import { createCustomElement } from "../../../utils/elements";

interface SelectorTitleProps {
  asChild?: boolean;
  children?: React.ReactElement | React.ReactElement[] | undefined;
}

export default function SelectorTitle(props: SelectorTitleProps) {
  const { children, asChild = false } = props;

  if (asChild) {
    return createCustomElement<SelectorTitleProps>(children, props);
  }

  return <DefaultSelectorTitleStyle>{children}</DefaultSelectorTitleStyle>;
}

const DefaultSelectorTitleStyle = styled.div`
  padding: 3.4rem 0 2rem;

  border-bottom: 0.4rem solid ${({ theme }) => theme.colors.gray200};
`;
