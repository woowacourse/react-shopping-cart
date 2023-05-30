import styled from "styled-components";
import { createCustomElement } from "../../../utils/elements";

interface OptionGroupProps {
  asChild?: boolean;
  children?: React.ReactElement | React.ReactElement[] | undefined;
}

export default function OptionGroup(props: OptionGroupProps) {
  const { children, asChild = false } = props;

  if (asChild) {
    return createCustomElement<OptionGroupProps & { "data-testId": string }>(
      children,
      props
    );
  }

  return (
    <DefaultOptionGroupStyle data-testId="group">
      {children}
    </DefaultOptionGroupStyle>
  );
}

const DefaultOptionGroupStyle = styled.div``;
