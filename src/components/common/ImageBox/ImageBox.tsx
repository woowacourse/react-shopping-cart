import * as S from './ImageBox.style';

export type ImageBoxProps = {
  src?: string;
  radius?: 's' | 'm' | 'l' | number;
  width: number;
  height: number;
  border?: string;
  backgroundColor?: string;
};

const ImageBox = ({ src = '', ...rest }: ImageBoxProps) => {
  return (
    <S.ImageBox {...rest}>
      <img src={src} alt="image" />
    </S.ImageBox>
  );
};

export default ImageBox;
