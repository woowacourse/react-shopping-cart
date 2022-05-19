import * as Styled from './Image.style';
interface ImagePropsType {
  src: string;
  alt: string;
  width?: string;
  height?: string;
}

function Image({ src, alt, width = '100%', height = '100%' }: ImagePropsType) {
  return (
    <Styled.ImageContainer width={width} height={height}>
      <Styled.Image src={src} alt={alt} />
    </Styled.ImageContainer>
  );
}

export default Image;
