import defaultImage from '/assets/default_product.png';
import * as S from './FallbackImage.styles';

function FallbackImage({ alt = '상품 이미지', ...props }) {
  return <S.FallbackImage src={defaultImage} alt={alt} {...props} />;
}

export default FallbackImage;
