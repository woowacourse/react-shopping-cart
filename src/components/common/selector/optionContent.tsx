import { Children } from "react";
import styled from "styled-components";
import { createCustomElement, hasCustomChild } from "../../../utils/elements";

interface OptionContentProps {
  asChild?: boolean;
  children?: React.ReactElement | React.ReactElement[] | undefined;
}

export default function OptionContent(props: OptionContentProps) {
  const { children, asChild = false } = props;

  if (asChild) {
    return createCustomElement<OptionContentProps & { "data-testid": string }>(
      children,
      props
    );
  }

  return (
    <DefaultOptionContentStyle data-testid="content">
      {children}
    </DefaultOptionContentStyle>
  );
}

const DefaultOptionContentStyle = styled.div``;
