import * as S from './style';

type ButtonProps = {
  text: string;
  width?: string;
};

function Button({ text, width = '100%' }: ButtonProps) {
  return <S.Button width={width}>{text}</S.Button>;
}

export default Button;
