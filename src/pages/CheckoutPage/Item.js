import PropTypes from 'prop-types';

import * as S from './style.js';

export const Item = (props) => {
  const { product, ...rest } = props;
  const { name, imageUrl, cartIds } = product;
  const quantity = cartIds.length;

  return (
    <S.Container {...rest}>
      <S.Image src={imageUrl} />
      <S.Content>
        <S.Name>{name}</S.Name>
        <S.Quantity>수량 : {quantity}</S.Quantity>
      </S.Content>
    </S.Container>
  );
};

Item.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};
