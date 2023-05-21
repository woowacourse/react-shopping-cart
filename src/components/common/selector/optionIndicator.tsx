import { useContext } from "react";
import styled from "styled-components";
import { SelectBoxContext } from "../../../context/selector";
import { createCustomElement } from "../../../utils/elements";

interface OptionIndicatorProops {
  asChild?: boolean;
  children?: React.ReactElement | React.ReactElement[] | undefined;
  onClick?: () => void;
  id: number;
}

export default function OptionIndicator(props: OptionIndicatorProops) {
  const { children, asChild = false, onClick, id } = props;
  const { toggleSelectBox } = useContext(SelectBoxContext);

  function composeHandler() {
    onClick && onClick();
    toggleSelectBox(id);
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
