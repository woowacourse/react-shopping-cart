import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';

import Button from 'component/common/Button';

import {DetailItemWrapper, ItemNameWrapper, ItemPriceWrapper} from 'component/DetailItem/style';
import {ADD_CART} from 'store/modules/cart';

export default function DetailItem({itemImgURL, itemName, itemPrice, id, disabled}) {
  const [disable, setDisable] = useState(disabled);

  const dispatch = useDispatch();
  const handleCartButtonClick = () => {
    setDisable(true);
    dispatch({type: ADD_CART, payload: {itemImgURL, itemName, itemPrice, id, count: 1}});
  };

  return (
    <DetailItemWrapper>
      <img src={itemImgURL} alt="이미지" width="570px" height="570px" />
      <ItemNameWrapper>{itemName}</ItemNameWrapper>
      <ItemPriceWrapper>
        <div>금액</div>
        <div>{itemPrice}원</div>
      </ItemPriceWrapper>
      <Button
        backgroundColor="#73675C"
        width="640px"
        height="100px"
        onClick={(itemImgURL, itemName, itemPrice) => {
          handleCartButtonClick(itemImgURL, itemName, itemPrice, id);
        }}
        disabled={disable}
        disable={disable}
      >
        장바구니
      </Button>
    </DetailItemWrapper>
  );
}

DetailItem.propTypes = {
  id: PropTypes.number,
  itemImgURL: PropTypes.string,
  itemName: PropTypes.string,
  itemPrice: PropTypes.number,
  disabled: PropTypes.bool,
};
