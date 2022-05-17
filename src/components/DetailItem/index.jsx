import React, {useState} from 'react';
//import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';

// import {ADD_CART} from 'store/modules/cart';

import Button from 'components/common/Button';

import {DetailItemWrapper, ItemNameWrapper, ItemPriceWrapper} from 'components/DetailItem/style';

export default function DetailItem({itemImgURL, itemName, itemPrice = 0, disabled}) {
  const [disable, setDisable] = useState(disabled);
  //const dispatch = useDispatch();

  const handleCartButtonClick = () => {
    setDisable(true);
    //dispatch({type: ADD_CART, payload: {itemImgURL, itemName, itemPrice, id, count: 1}});
  };

  return (
    <DetailItemWrapper>
      <img src={itemImgURL} alt="상품 이미지" width="570px" height="570px" />
      <ItemNameWrapper>{itemName}</ItemNameWrapper>
      <ItemPriceWrapper>
        <div>금액</div>
        <div>{itemPrice.toLocaleString()}원</div>
      </ItemPriceWrapper>
      <Button
        backgroundColor="brown"
        width="640px"
        height="100px"
        onClick={handleCartButtonClick}
        disabled={disable}
      >
        장바구니
      </Button>
    </DetailItemWrapper>
  );
}

DetailItem.propTypes = {
  id: PropTypes.string,
  itemImgURL: PropTypes.string,
  itemName: PropTypes.string,
  itemPrice: PropTypes.number,
  disabled: PropTypes.bool,
};
