import React, { HTMLAttributes, VFC } from "react";

import { Container, CheckMark, Input, Svg, Path } from "./style";

interface CheckBoxProps extends HTMLAttributes<HTMLInputElement> {
  checked: boolean;
}

const CheckBox: VFC<CheckBoxProps> = ({ ...props }) => (
  <Container>
    <Input type="checkbox" {...props} />
    <CheckMark>
      <Svg viewBox={"0 0 10 10"}>
        <Path d={"M 1.4,5 L 4,7 L 8,2"} />
      </Svg>
    </CheckMark>
  </Container>
);

export default CheckBox;
export { CheckBoxProps };
