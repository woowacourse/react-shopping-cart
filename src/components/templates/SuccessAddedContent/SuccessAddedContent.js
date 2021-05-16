import React from 'react';
import PropTypes from 'prop-types';

import { ColumnProductItem } from '../..';
import {
  ModalText,
  ModalButton,
  RecommendedContainer,
  RecommendedTitle,
  RecommendedList,
} from './SuccessAddedContent.styles';
import { numberWithCommas } from '../../../utils';

const SuccessAddedContent = ({ productList, openModal, onClickMoveCartPageButton }) => (
  <>
    <ModalText>상품이 장바구니에 담겼습니다.</ModalText>
    <ModalButton onClick={onClickMoveCartPageButton}>{'장바구니 바로가기 >'}</ModalButton>

    <RecommendedContainer>
      <RecommendedTitle>❤️ 잠깐! 아래 상품들도 살펴보세요! ❤️</RecommendedTitle>
      <RecommendedList>
        {productList.slice(0, 3).map(({ id, img, name, price }) => (
          <ColumnProductItem
            key={id}
            imgSrc={img}
            name={name}
            price={`${numberWithCommas(price)} 원`}
            onClick={openModal}
            isVisibleIcon={false}
          />
        ))}
      </RecommendedList>
    </RecommendedContainer>
  </>
);

SuccessAddedContent.propTypes = {
  productList: PropTypes.arrayOf(PropTypes.object).isRequired,
  openModal: PropTypes.func.isRequired,
  onClickMoveCartPageButton: PropTypes.func.isRequired,
};

export default SuccessAddedContent;
