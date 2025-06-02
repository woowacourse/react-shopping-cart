import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Button = styled.button<{ disabled?: boolean }>`
  border: 1px solid #0000001a;
  border-radius: 8px;
  width: 24px;
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${(props) => (props.disabled ? "#f5f5f5" : "")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;
