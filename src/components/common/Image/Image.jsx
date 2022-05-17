import * as Styled from './Image.style';
import errorImage from './error.svg';

function Image({ src, alt, width = '100%', height = '100%' }) {
  const handleError = (e) => {
    e.target.src = errorImage;
  };

  return (
    <Styled.ImageContainer width={width} height={height}>
      <Styled.Image src={src} alt={alt} onError={handleError} />
    </Styled.ImageContainer>
  );
}

export default Image;
