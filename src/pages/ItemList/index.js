import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Grid, Card } from '../../components/shared';
import { Description, Price } from './style';
import IconButton from '../../components/shared/IconButton';
import { ReactComponent as CartIcon } from '../../assets/icons/cart.svg';
import { PATH } from '../../constants';
import { addItemToCart } from '../../store/cartReducer';
import { API } from '../../utils';

const ItemList = () => {
  const list = useSelector(state => state.reducer.itemList);
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
              <IconButton
                size="medium"
                ariaLabel={`${name}을 장바구니에 담기`}
                onClick={async () => {
                  try {
                    const data = { id, name, image, price, quantity: 1, checked: true };
                    const newCartItem = await API.addItemToCart(data);

                    dispatch(addItemToCart(newCartItem));

                    alert(`장바구니에 추가되었습니다.`);
                  } catch (error) {
                    console.error(error.message);
                    alert('이미 추가된 상품입니다.');
                  }
                }}
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
