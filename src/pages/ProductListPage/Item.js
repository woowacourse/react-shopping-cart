import PropTypes from 'prop-types';

import { Button, IconCart, SkeletonResponsiveBox, SkeletonLine } from '../../components';
import * as S from './style.js';
import { getFormattedAsKRW } from '../../utils';
import { COLOR } from '../../constants';

export const Item = (props) => {
  const { product, onClickCartIcon, onClickImage, ...rest } = props;
  const { name, price, imageUrl } = product;
  const handleImageError = (e) => {
    // TODO: 이미지 로딩 실패 시 에러 처리
  };

  return (
    <S.Container {...rest}>
      <S.Image src={imageUrl} onClick={onClickImage} onError={handleImageError} />
      <S.Footer>
        <S.Label>
          <S.Name>{name}</S.Name>
          <S.Price>{getFormattedAsKRW(price)}</S.Price>
        </S.Label>
        <Button onClick={onClickCartIcon}>
          <IconCart width="30" color={COLOR.HEX.GRAY_800} />
        </Button>
      </S.Footer>
    </S.Container>
  );
};

Item.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    img: PropTypes.string,
  }).isRequired,
  onClickCartIcon: PropTypes.func.isRequired,
  onClickImage: PropTypes.func.isRequired,
};

export const ItemSkeleton = () => {
  return (
    <S.Container>
      <SkeletonResponsiveBox />
      <SkeletonLine />
      <S.Footer>
        <S.Label>
          <SkeletonLine style={{ width: '60%' }} />
          <SkeletonLine style={{ width: '60%' }} />
        </S.Label>
      </S.Footer>
    </S.Container>
  );
};
