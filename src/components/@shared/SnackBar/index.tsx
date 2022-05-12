import * as Styled from "./styles";

interface SnackBarProps {
  message: string;
}

function SnackBar({ message }: SnackBarProps) {
  return <Styled.SnackBar>{message}</Styled.SnackBar>;
}

export default SnackBar;
