import React, { useEffect, useState } from 'react';
import { Grid, Card } from '../../components/shared';
import { Description, Price, CartButton, CartIcon } from './style';
import cartIcon from '../../assets/icons/cart.svg';

const ItemList = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const getItemListRequest = async () => {
      const response = await fetch(
        'https://sunhpark42.github.io/test_asset/woowa-mart/itemList.json',
      );

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
          description={
            <Description>
              <Price>{price.toLocaleString('ko-KR')} 원</Price>
              <CartButton
                onClick={() => {
                  // 장바구니 추가 REQUEST
                  console.log(id);
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
