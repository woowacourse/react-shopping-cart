import { ComponentProps } from "react";
import styled from "@emotion/styled";
import { visuallyHidden } from "@/util/style/visuallyHidden";

type Size = "small" | "medium";

interface CheckboxProps extends ComponentProps<"input"> {
  id: string;
  checked: boolean;
  onChange: () => void;
  label: string;
  boxSize?: Size;
  hidden?: boolean;
}

const CheckBox = ({
  id,
  checked,
  onChange,
  label,
  boxSize = "medium",
  hidden = false,
}: CheckboxProps) => {
  return (
    <CheckboxWrapper>
      <HiddenCheckbox
        id={id}
        type="checkbox"
        checked={checked || false}
        onChange={onChange}
        aria-labelledby={`${id}-label`}
      />

      <StyledLabel htmlFor={id} id={`${id}-label`}>
        <CustomCheckbox checked={checked} size={boxSize} />
        <CheckboxText size={boxSize} hidden={hidden}>
          {label}
        </CheckboxText>
      </StyledLabel>
    </CheckboxWrapper>
  );
};

export default CheckBox;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  input:focus-visible + label > span:first-of-type {
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.2);
  }
`;

const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const StyledLabel = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
`;

const CustomCheckbox = styled.span<{ checked: boolean; size: Size }>`
  width: ${(props) => (props.size === "small" ? "16px" : "20px")};
  height: ${(props) => (props.size === "small" ? "16px" : "20px")};
  border: 2px solid #000;
  border-radius: 4px;
  position: relative;
  transition: background-color 0.2s ease, border-color 0.2s ease;
  margin-right: ${(props) => (props.size === "small" ? "6px" : "8px")};

  background-color: ${(props) => (props.checked ? "#000" : "#fff")};
  border-color: #000;

  &::after {
    content: "";
    position: absolute;
    width: ${(props) => (props.size === "small" ? "5px" : "6px")};
    height: ${(props) => (props.size === "small" ? "10px" : "12px")};
    border: solid #fff;
    border-width: 0 ${(props) => (props.size === "small" ? "2px" : "2px")}
      ${(props) => (props.size === "small" ? "2px" : "2px")} 0;
    top: 40%;
    left: 50%;
    transform: ${(props) =>
      props.checked
        ? "translate(-50%, -50%) rotate(45deg) scale(1)"
        : "translate(-50%, -50%) rotate(45deg) scale(0)"};
    transform-origin: center center;
    transition: transform 0.2s ease;
  }
`;

const CheckboxText = styled.span<{ size: Size; hidden?: boolean }>`
  font-size: ${(props) => (props.size === "small" ? "12px" : "14px")};
  color: #000;
  ${(props) => props.hidden && visuallyHidden}
`;
