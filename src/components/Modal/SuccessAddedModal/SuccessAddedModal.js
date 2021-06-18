import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { useFetch } from '../../../hooks';
import { IMAGE_SIZE, ROUTE } from '../../../constants';
import ColumnProductItem from '../../ProductItem/ColumnProductItem/ColumnProductItem';
import {
  ModalText,
  ModalButton,
  RecommendedContainer,
  RecommendedTitle,
  RecommendedList,
} from './SuccessAddedModal.styles';
import { requestProductList } from '../../../service/product';

const SuccessAddedModal = ({ setModalOpen }) => {
  const history = useHistory();

  const [productList, getProductListError] = useFetch([], requestProductList);

  const goProductDetail = productId => {
    history.push({
      pathname: `${ROUTE.PRODUCT_DETAIL}/${productId}`,
    });

    setModalOpen(false);
  };

  return (
    <>
      <ModalText>상품이 장바구니에 담겼습니다.</ModalText>
      <ModalButton onClick={() => history.push({ pathname: ROUTE.SHOPPING_CART })}>{'장바구니 바로가기 >'}</ModalButton>
      {!getProductListError && (
        <RecommendedContainer>
          <RecommendedTitle>이달의 상품 TOP 5</RecommendedTitle>
          <RecommendedList>
            {productList.slice(0, 5).map(({ product_id: id, image_url: img, name, price }) => (
              <ColumnProductItem
                imageSize={IMAGE_SIZE.SM}
                key={id}
                imgSrc={img}
                name={name}
                price={price}
                onClick={() => setModalOpen(true)}
                isVisibleIcon={false}
                onClickImage={() => goProductDetail(id)}
              />
            ))}
          </RecommendedList>
        </RecommendedContainer>
      )}
    </>
  );
};

SuccessAddedModal.propTypes = {
  setModalOpen: PropTypes.func.isRequired,
};

export default SuccessAddedModal;
