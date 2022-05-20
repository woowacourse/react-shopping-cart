import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';

import useCart from 'hooks/useCart';

import {DetailItemPageWrapper} from 'pages/ProductDetailPage/style';
import DetailItem from 'components/DetailItem';
import appClient from 'utils/appClient';

export default function ProductDetailPage() {
  const [detailItem, setDetailItem] = useState('');
  const {data: cart, getCartList} = useCart();

  const {id} = useParams();

  const disable = cart.some(({id: productId}) => productId === +id);

  useEffect(() => {
    const get = async () => {
      const {data: productItem} = await appClient.get(`/products/${id}`);
      setDetailItem(productItem);
    };

    get();
    getCartList();
  }, []);

  return (
    <DetailItemPageWrapper>
      {
        <DetailItem
          itemImgURL={detailItem.image}
          itemName={detailItem.name}
          itemPrice={detailItem.price}
          id={id}
          disabled={disable}
        />
      }
    </DetailItemPageWrapper>
  );
}

ProductDetailPage.propTypes = {
  itemImgURL: PropTypes.string,
  itemName: PropTypes.string,
  itemPrice: PropTypes.string,
};
