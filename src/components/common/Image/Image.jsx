import * as Styled from './Image.style';

function Image({ src, alt, width = '100%', height = '100%' }) {
  return (
    <Styled.ImageContainer width={width} height={height}>
      <Styled.Image src={src} alt={alt} />
    </Styled.ImageContainer>
  );
}

export default Image;
