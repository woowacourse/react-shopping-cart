import { SnackBarWrapper } from "./styles";

interface SnackBarProps {
  message: string;
}

function SnackBar({ message }: SnackBarProps) {
  return <SnackBarWrapper>{message}</SnackBarWrapper>;
}

export default SnackBar;
