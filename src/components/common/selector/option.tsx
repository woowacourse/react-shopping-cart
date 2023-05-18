import { Children } from "react";
import styled from "styled-components";
import { createCustomElement, hasCustomChild } from "../../../utils/elements";

interface OptionProps {
  asChild?: boolean;
  children?: React.ReactElement | React.ReactElement[] | undefined;
}

export default function Option(props: OptionProps) {
  const { children, asChild = false } = props;
  const customElement = children ? Children.only(children) : null;

  if (customElement && hasCustomChild(asChild, customElement)) {
    return createCustomElement<OptionProps & { "data-testId": string }>(
      customElement,
      { ...props, "data-testId": "custom-option" }
    );
  }

  return (
    <DefaultOptionStyle data-testId="option">{children}</DefaultOptionStyle>
  );
}

const DefaultOptionStyle = styled.div``;
