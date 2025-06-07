import styled from "@emotion/styled";
import CheckBox from "./CheckBox";

interface CheckboxLabelProps {
  isChecked: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function CheckboxLabel({ isChecked, onToggle, children }: CheckboxLabelProps) {
  return (
    <Container>
      <CheckBox
        isChecked={isChecked}
        onToggle={onToggle}
        role={"cart-item-all-checkbox"}
        aria-checked={isChecked}
      ></CheckBox>
      {children}
    </Container>
  );
}

export default CheckboxLabel;

const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 8px 0;
`;
