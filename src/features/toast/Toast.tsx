import * as S from "./Toast.styles";
import { ToastType } from "./type";

interface Props {
  message: string;
  type: ToastType;
}

const Toast = ({ message, type }: Props) => {
  return <S.Toast $type={type}>{message}</S.Toast>;
};

export default Toast;
