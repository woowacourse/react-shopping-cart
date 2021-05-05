import React, { ChangeEventHandler, VFC } from "react";

import { Container, CheckMark, Input, Svg, Path } from "./style";

interface ICheckBoxProps {
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const CheckBox: VFC<ICheckBoxProps> = ({ checked, onChange }) => (
  <Container>
    <Input type="checkbox" checked={checked} onChange={onChange} />
    <CheckMark>
      <Svg viewBox={"0 0 10 10"}>
        <Path d={"M 1.4,5 L 4,7 L 8,2"} />
      </Svg>
    </CheckMark>
  </Container>
);

export default CheckBox;
export { ICheckBoxProps };
