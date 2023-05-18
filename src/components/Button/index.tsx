import * as S from './style';

type ButtonProps = {
  text: string;
  width?: string;
  backgroundColor?: string;
};

function Button({ text, width = '100%', backgroundColor = '#000000' }: ButtonProps) {
  return (
    <S.Button width={width} backgroundColor={backgroundColor}>
      {text}
    </S.Button>
  );
}

export default Button;
