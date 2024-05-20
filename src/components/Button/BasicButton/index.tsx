import styled from "styled-components";

interface BasicButtonProps {
  label: string;
  onClick: () => void;
}

const BasicButton = ({ label, onClick }: BasicButtonProps) => {
  return <Button onClick={onClick}>{label}</Button>;
};

export default BasicButton;

const Button = styled.button`
  box-sizing: border-box;
  border: 1px solid #0000001a;
  border-radius: 4px;
  width: 40px;
  height: 24px;
  font-size: 12px;
  font-weight: 500;
  padding: 0;
  background: white;
  color: black;
`;
