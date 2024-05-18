import * as S from './ImageBox.style';

export type ImageBoxProps = {
  src?: string;
  alt?: string;
  radius?: 's' | 'm' | 'l' | number;
  width: number;
  height: number;
  border?: string;
  backgroundColor?: string;
};

const ImageBox = ({ src = '', alt = '', ...rest }: ImageBoxProps) => {
  return (
    <S.ImageBox {...rest}>
      <img src={src} alt={alt} />
    </S.ImageBox>
  );
};

export default ImageBox;
