import React, {useState} from 'react';
//import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';

import useReducerSelect from 'hooks/useReducerSelect';
import {postCart} from 'store/modules/cart';

import Button from 'components/common/Button';

import {DetailItemWrapper, ItemNameWrapper, ItemPriceWrapper} from 'components/DetailItem/style';
import {useParams} from 'react-router-dom';

export default function DetailItem({itemImgURL, itemName, itemPrice = 0, disabled}) {
  const [disable, setDisable] = useState(disabled);
  const {dispatch, pending, error, data} = useReducerSelect('cartReducer');

  const {id} = useParams();

  const handleCartButtonClick = () => {
    setDisable(true);
    dispatch(postCart(id));
    console.log(pending, error, data);
  };

  return (
    <DetailItemWrapper>
      <img src={itemImgURL} alt={`${itemName} 상품 이미지`} width="570px" height="570px" />
      <ItemNameWrapper>{itemName}</ItemNameWrapper>
      <ItemPriceWrapper>
        <div>금액</div>
        <div>{itemPrice.toLocaleString()}원</div>
      </ItemPriceWrapper>
      <Button
        buttonType="brownBackground"
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
