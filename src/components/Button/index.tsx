import * as S from './style';

type ButtonProps = {
  text: string;
  width?: string;
  backgroundColor?: string;
  onClick?: () => void;
};

function Button({ text, width = '100%', backgroundColor = '#000000', onClick }: ButtonProps) {
  return (
    <S.Button width={width} backgroundColor={backgroundColor} onClick={onClick}>
      {text}
    </S.Button>
  );
}

export default Button;
