import React, {useEffect, useState} from 'react';
import axios from 'axios';

import Item from 'component/Item';
import PropTypes from 'prop-types';

import {ItemListWrapper} from 'page/ProductListPage/style';

export default function ProductListPage() {
  const instance = axios.create({
    baseURL: 'https://shopping-cart-dory-nine.herokuapp.com/',
  });

  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      instance.get('products').then(({data}) => setItemList(data));
    }
    fetchData();
  }, []);

  return (
    <ItemListWrapper>
      {itemList.map(({id, image, name, price}) => (
        <Item itemImgURL={image} itemName={name} itemPrice={price.toString()} key={id} />
      ))}
    </ItemListWrapper>
  );
}

ProductListPage.propTypes = {
  itemList: PropTypes.array,
};
