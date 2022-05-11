import React from 'react';
import PropTypes from 'prop-types';

import DetailItem from 'component/DetailItem';

import {DetailItemPageWrapper} from 'page/ProductDetailPage/style';

export default function ProductDetailPage({itemImgURL, itemName, itemPrice}) {
  return (
    <DetailItemPageWrapper>
      <DetailItem itemImgURL={itemImgURL} itemName={itemName} itemPrice={itemPrice} />
    </DetailItemPageWrapper>
  );
}

ProductDetailPage.propTypes = {
  itemImgURL: PropTypes.string,
  itemName: PropTypes.string,
  itemPrice: PropTypes.string,
};
