import styled from "styled-components";
import { createCustomElement } from "../../../utils/elements";

interface OptionProps {
  asChild?: boolean;
  children?: React.ReactElement | React.ReactElement[] | undefined;
}

export default function Option(props: OptionProps) {
  const { children, asChild = false } = props;

  if (asChild) {
    return createCustomElement<OptionProps & { "data-testId": string }>(
      children,
      props
    );
  }

  return (
    <DefaultOptionStyle data-testId="option">{children}</DefaultOptionStyle>
  );
}

const DefaultOptionStyle = styled.div`
  display: flex;

  height: 20rem;
  width: 74rem;
  padding-top: 2rem;

  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.primary};
`;
