import * as S from "./styles";

interface SnackBarProps {
  message: string;
}

function SnackBar({ message }: SnackBarProps) {
  return <S.SnackBar>{message}</S.SnackBar>;
}

export default SnackBar;
