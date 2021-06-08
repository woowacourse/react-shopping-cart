import PropTypes from 'prop-types';

import { Button, IconCart } from '../../components';
import * as S from './style.js';
import { getFormattedAsKRW } from '../../utils';
import { COLOR } from '../../constants';

export const Item = (props) => {
  const { product, addProduct, ...rest } = props;
  const { name, price, imageUrl } = product;

  return (
    <S.Container {...rest}>
      <S.Image src={imageUrl} />
      <S.Footer>
        <S.Label>
          <S.Name>{name}</S.Name>
          <S.Price>{getFormattedAsKRW(price)}</S.Price>
        </S.Label>
        <Button onClick={() => addProduct(product)}>
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
  addProduct: PropTypes.func.isRequired,
};
