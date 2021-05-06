import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Grid, Card } from '../../components/shared';
import { Description, Price, CartButton, CartIcon } from './style';
import cartIcon from '../../assets/icons/cart.svg';
import { PATH } from '../../constants';
import { addItemToCart } from '../../store';
import { API } from '../../utils';

const ItemList = () => {
  const list = useSelector(state => state.itemList);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <Grid col="4">
      {Object.values(list).map(({ id, name, image, price }) => (
        <Card
          key={id}
          title={name}
          thumbnail={{ image, alt: name }}
          onClick={() => {
            history.push(`${PATH.GOODS_DETAIL}?id=${id}`);
          }}
          description={
            <Description>
              <Price>{price.toLocaleString('ko-KR')} 원</Price>
              <CartButton
                onClick={async () => {
                  try {
                    const data = { id: id, quantity: 1 };
                    const newCartItem = await API.addItemToCart(data);

                    dispatch(addItemToCart(newCartItem));

                    alert(`장바구니에 추가되었습니다. 상품 id : ${id}`);
                  } catch (error) {
                    console.error(error.message);
                    alert('장바구니에 추가하지 못했습니다.');
                  }
                }}
              >
                <CartIcon src={cartIcon} alt="장바구니" />
              </CartButton>
            </Description>
          }
        />
      ))}
    </Grid>
  );
};

export default ItemList;
