import PropTypes from 'prop-types';
import { Button, CartIcon } from '../../../components';
import { getFormattedAsKRW } from '../../../utils';
import * as S from './style.js';

export const ProductItem = (props) => {
  const { product, addProduct, goToDetail, ...rest } = props;
  const { id, name, price, img } = product;

  return (
    <S.Container {...rest}>
      <S.Image src={img} onClick={() => goToDetail(id)} />
      <S.Footer>
        <S.Label>
          <S.Name>{name}</S.Name>
          <S.Price>{getFormattedAsKRW(price)}</S.Price>
        </S.Label>
        <Button onClick={() => addProduct(product)}>
          <CartIcon width="30" color="#333333" />
        </Button>
      </S.Footer>
    </S.Container>
  );
};

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    img: PropTypes.string,
  }).isRequired,
  addProduct: PropTypes.func.isRequired,
};
