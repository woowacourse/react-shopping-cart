import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';

import useCart from 'hooks/useCart';

import Button from 'components/common/Button';

import {DetailItemWrapper, ItemNameBox, ItemPriceContainer} from 'components/DetailItem/style';
import {Image} from 'components/common/style';

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
      <Image src={itemImgURL} alt={`${itemName} 상품 이미지`} imgSize="l" />
      <ItemNameBox>{itemName}</ItemNameBox>
      <ItemPriceContainer>
        <div>금액</div>
        <div>{itemPrice.toLocaleString()}원</div>
      </ItemPriceContainer>
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
