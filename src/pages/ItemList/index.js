import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addItemToCart } from '../../store/cartReducer';
import { API } from '../../services'
import { MESSAGE, PATH } from '../../constants';
import { Grid, Card, IconButton } from '../../components/shared';
import { Description, Price } from './style';
import { ReactComponent as CartIcon } from '../../assets/icons/cart.svg';

const ItemList = () => {
  const list = useSelector(state => state.itemListReducer.itemList);
  const dispatch = useDispatch();
  const history = useHistory();

  const goDetailPage = id => () => {
    history.push(`${PATH.GOODS_DETAIL}?id=${id}`);
  };

  const addCart = data => async () => {
    try {
      const newCartItem = await API.addItemToCart({ ...data, quantity: 1, checked: true });

      dispatch(addItemToCart(newCartItem));
      alert(MESSAGE.SUCCESS_ADD_ITEM_TO_CART);
    } catch (error) {
      console.error(error.message);
      alert(MESSAGE.FAIL_ADD_ITEM_TO_CART);
    }
  };

  return (
    <Grid col="4">
      {Object.values(list).map(({ id, name, image, price }) => (
        <Card
          key={id}
          title={name}
          thumbnail={{ image, alt: name }}
          onClick={goDetailPage(id)}
          description={
            <Description>
              <Price>{price.toLocaleString('ko-KR')} 원</Price>
              <IconButton
                size="medium"
                ariaLabel={`${name}을 장바구니에 담기`}
                onClick={addCart({ id, name, image, price })}
              >
                <CartIcon />
              </IconButton>
            </Description>
          }
        />
      ))}
    </Grid>
  );
};

export default ItemList;
