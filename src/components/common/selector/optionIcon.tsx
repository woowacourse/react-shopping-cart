import { Children } from "react";
import styled from "styled-components";
import checkIcon from "../../../asset/check.png";
import { createCustomElement, hasCustomChild } from "../../../utils/elements";

interface OptionIconProops {
  asChild?: boolean;
  children?: React.ReactElement | React.ReactElement[] | undefined;
}

export default function OptionIcon(props: OptionIconProops) {
  const { children, asChild = false } = props;
  const customElement = children ? Children.only(children) : null;

  if (customElement && hasCustomChild(asChild, customElement)) {
    return createCustomElement<boolean>(customElement, asChild);
  }

  return <DefaultOptionIconStyle src={checkIcon} alt="icon" />;
}

const DefaultOptionIconStyle = styled.img``;
