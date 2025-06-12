import Vector from "../../../assets/Vector.svg";

import * as Styled from "./WarningBox.styles";

export default function WarningBox({ text }: { text: string }) {
  return (
    <Styled.Container>
      <Styled.WarningIcon src={Vector} />
      <p>{text}</p>
    </Styled.Container>
  );
}
