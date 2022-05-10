import * as Styled from './Image.style';

function Image({ src, alt, width, height }) {
  return (
    <Styled.ImageContainer width={width} height={height}>
      <Styled.Image src={src} alt={alt} />
    </Styled.ImageContainer>
  );
}

export default Image;
