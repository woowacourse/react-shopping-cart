import styled from "styled-components";

interface RoundButtonProps {
  label: string;
}

const RoundButton = ({ label }: RoundButtonProps) => {
  return <Button>{label}</Button>;
};

export default RoundButton;

const Button = styled.button`
  box-sizing: border-box;
  border: 1px solid #0000001a;
  border-radius: 4px;
`;
