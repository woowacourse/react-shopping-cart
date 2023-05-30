import { css, styled } from 'styled-components';
import { ImageSize, imageSizeMapper } from '../../common/Image/Image';
import Skeleton from '../../common/Skeleton/Skeleton';

const ProductItemFallback = () => {
  return (
    <Container role="status">
      <ImageWrapper size="large">
        <Skeleton />
      </ImageWrapper>
      <TitleWrapper>
        <Skeleton />
      </TitleWrapper>
      <PriceWrapper>
        <Skeleton />
      </PriceWrapper>
    </Container>
  );
};

const Container = styled.div`
  height: 358px;
`;

const ImageWrapper = styled.div<{ size: ImageSize }>`
  ${({ size }) => css`
    width: ${imageSizeMapper[size]};
    height: ${imageSizeMapper[size]};
  `}
`;

const TitleWrapper = styled.div`
  width: 140px;
  height: 20px;
  margin-top: 18px;
`;

const PriceWrapper = styled.div`
  width: 80px;
  height: 22px;
  margin-top: 3px;
`;

export default ProductItemFallback;
