import * as Styled from './style.js';
import { CartIcon } from '../../';
import { getFormattedAsKRW } from '../../../../utils';

/*
  item 데이터 형식
  {
    "id": "1",
    "name": "PET보틀-정사각(420ml)",
    "price": "43400",
    "img": "/src/mockData/images/img1.png"
  },
*/

export const ProductItem = (props) => {
  const { item } = props;
  const { name, price, img } = item;

  return (
    <Styled.Container>
      <Styled.Image src={img} />
      <Styled.Footer>
        <Styled.Label>
          <Styled.Name>{name}</Styled.Name>
          <Styled.Price>{getFormattedAsKRW(price)}</Styled.Price>
        </Styled.Label>
        <Styled.Button>
          <CartIcon width="30" color="#333333" />
        </Styled.Button>
      </Styled.Footer>
    </Styled.Container>
  );
};
