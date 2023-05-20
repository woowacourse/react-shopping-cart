import { useContext } from "react";
import styled from "styled-components";
import { SelectBoxContext } from "../../../context/selector";
import { createCustomElement } from "../../../utils/elements";

interface OptionIndicatorProops {
  asChild?: boolean;
  children?: React.ReactElement | React.ReactElement[] | undefined;
  onClick?: (id: number) => void;
}

export default function OptionIndicator(props: OptionIndicatorProops) {
  const { children, asChild = false, onClick } = props;
  const { selected, toggleSelectBox } = useContext(SelectBoxContext);

  function composeHandler() {
    onClick && onClick(1);
    toggleSelectBox(1);
  }

  if (asChild) {
    return createCustomElement<
      OptionIndicatorProops & { composeHandler: () => void }
    >(children, { ...props, onClick: composeHandler });
  }

  return (
    <DefaultOptionIndicatorStyle onClick={composeHandler}>
      {children}
    </DefaultOptionIndicatorStyle>
  );
}

const DefaultOptionIndicatorStyle = styled.div``;
