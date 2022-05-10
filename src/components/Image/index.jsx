import ImageStyled from './style';

function Image({ src, size }) {
  return <ImageStyled src={src} size={size} />;
}

export default Image;
