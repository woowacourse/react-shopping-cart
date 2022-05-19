import React, {useState} from 'react';
import PropTypes from 'prop-types';

import Button from 'components/common/Button';

import {DetailItemWrapper, ItemNameWrapper, ItemPriceWrapper} from 'components/DetailItem/style';
import {useParams} from 'react-router-dom';
import useCart from 'hooks/useCart';

export default function DetailItem({itemImgURL, itemName, itemPrice = 0, disabled}) {
  const [disable, setDisable] = useState(disabled);
  const {postCartItem} = useCart();

  const {id} = useParams();

  const handleCartButtonClick = () => {
    setDisable(true);
    postCartItem(id);
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
        buttonSizeType="xl"
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
