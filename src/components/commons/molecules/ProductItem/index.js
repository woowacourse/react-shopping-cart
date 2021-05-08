import PropTypes from 'prop-types';
import * as Styled from './style.js';
import { Button, CartIcon } from '../../';
import { getFormattedAsKRW } from '../../../../utils';

/*
  item 데이터 형식
  {
    "id": "1",
    "name": "PET보틀-정사각(420ml)",
    "price": "43400",
    "img": "/mockImages/img1.png"
  },
*/

export const ProductItem = (props) => {
  const { item, ...rest } = props;
  const { name, price, img } = item;

  return (
    <Styled.Container {...rest}>
      <Styled.Image src={img} />
      <Styled.Footer>
        <Styled.Label>
          <Styled.Name>{name}</Styled.Name>
          <Styled.Price>{getFormattedAsKRW(price)}</Styled.Price>
        </Styled.Label>
        <Button>
          <CartIcon width="30" color="#333333" />
        </Button>
      </Styled.Footer>
    </Styled.Container>
  );
};

ProductItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    img: PropTypes.string,
  }),
};
