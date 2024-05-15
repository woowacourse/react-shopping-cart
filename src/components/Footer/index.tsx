import React from "react";
import Button from "../common/Button";
import { Wrapper } from "./style";

const Footer = () => {
  return (
    <Wrapper>
      <Button $theme="black" $size="full" $borderRadius="0">
        주문 확인
      </Button>
    </Wrapper>
  );
};

export default Footer;
