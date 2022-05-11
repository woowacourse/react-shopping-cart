import React, {useEffect, useState} from 'react';
import axios from 'axios';

import DetailItem from 'component/Item';
import PropTypes from 'prop-types';

import {ProductListPageWrapper} from 'page/ProductListPage/style';

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
    <ProductListPageWrapper>
      {itemList.map(({id, image, name, price}) => (
        <DetailItem
          itemImgURL={image}
          itemName={name}
          itemPrice={price.toString()}
          id={id}
          key={id}
        />
      ))}
    </ProductListPageWrapper>
  );
}

ProductListPage.propTypes = {
  itemList: PropTypes.array,
};
