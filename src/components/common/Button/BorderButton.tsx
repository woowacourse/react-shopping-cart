import styled from "@emotion/styled";

type WidthType = "fit" | "full";
interface Props {
  onClick: () => void;
  widthType?: WidthType;
}

const BorderButton = ({
  children,
  widthType = "fit",
  onClick,
}: React.PropsWithChildren<Props>) => {
  return (
    <StyledButton onClick={onClick} withType={widthType}>
      {children}
    </StyledButton>
  );
};

export default BorderButton;

const StyledButton = styled.button<{ withType: WidthType }>`
  width: ${(props) => (props.withType === "fit" ? "fit-content" : "100%")};
  padding: ${(props) => (props.withType === "fit" ? "6px 8px" : "12px")};
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  font-size: 14px;
  cursor: pointer;
`;
