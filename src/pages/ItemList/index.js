import React, { useEffect, useState } from 'react';
import { Grid, Card } from '../../components/shared';
import { Description, Price, CartButton, CartIcon } from './style';
import cartIcon from '../../assets/icons/cart.svg';
import { BASE_URL, PATH } from '../../constants';
import { useHistory } from 'react-router-dom';

const ItemList = () => {
  const [list, setList] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const getItemListRequest = async () => {
      const response = await fetch(`${BASE_URL}/itemList.json`);

      const result = await response.json();
      setList(result);
    };

    getItemListRequest();
  }, []);

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
                    const response = await fetch(`${BASE_URL}/addCart.json`);

                    if (!response.ok) {
                      throw new Error('add Cart Error');
                    }

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
