import styled from 'styled-components';
import { FALLBACK } from '../../../constants';

const onImageError = e => (e.target.src = FALLBACK.PRODUCT.IMG_URL);

export const Image = styled.img.attrs(({ src, alt }) => ({
  src,
  alt,
  onError: onImageError,
}))`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  object-fit: contain;
`;
