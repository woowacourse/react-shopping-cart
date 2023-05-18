import { Children, Fragment, PropsWithChildren } from "react";
import { createCustomElement, hasCustomChild } from "../../../utils/elements";

interface OptionContentProps {
  asChild?: boolean;
  children?: React.ReactElement | React.ReactElement[] | undefined;
}

export function OptionContent(props: OptionContentProps) {
  const { children, asChild = false } = props;
  const customElement = children ? Children.only(children) : null;

  if (customElement && hasCustomChild(asChild, customElement)) {
    return createCustomElement<OptionContentProps & { "data-testid": string }>(
      customElement,
      { ...props, "data-testid": "custom-content" }
    );
  }

  return <div data-testid="content">{children}</div>;
}
