import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useLocation} from 'react-router-dom';

import DetailItem from 'component/DetailItem';

import * as S from 'page/ProductDetailPage/style';
import useCartItem from 'hook/useCartItem';

export default function ProductDetailPage() {
  const {
    state: {itemImgURL, itemName, itemPrice, id, disable},
  } = useLocation();

  const [disableStatus, setDisableStatus] = useState(disable);
  const {addCartItem} = useCartItem();

  return (
    <S.DetailItemPageLayout>
      <DetailItem
        itemImgURL={itemImgURL}
        itemName={itemName}
        itemPrice={itemPrice}
        id={id}
        disabled={disableStatus}
        handleCartButtonClick={() => {
          addCartItem({itemImgURL, itemName, itemPrice, id, count: 1});
          setDisableStatus(true);
        }}
      />
    </S.DetailItemPageLayout>
  );
}

ProductDetailPage.propTypes = {
  itemImgURL: PropTypes.string,
  itemName: PropTypes.string,
  itemPrice: PropTypes.string,
};
