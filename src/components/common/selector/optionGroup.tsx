import { Children } from "react";
import styled from "styled-components";
import { createCustomElement, hasCustomChild } from "../../../utils/elements";

interface OptionGroupProps {
  asChild?: boolean;
  children?: React.ReactElement | React.ReactElement[] | undefined;
}

export default function OptionGroup(props: OptionGroupProps) {
  const { children, asChild = false } = props;
  const customElement = children ? Children.only(children) : null;

  if (customElement && hasCustomChild(asChild, customElement)) {
    return createCustomElement<OptionGroupProps>(customElement, props);
  }

  return (
    <DefaultOptionGroupStyle data-testId="group">
      {children}
    </DefaultOptionGroupStyle>
  );
}

const DefaultOptionGroupStyle = styled.div``;
