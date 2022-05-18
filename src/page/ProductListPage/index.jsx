import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';

import {getProductList} from 'store/modules/productList';

import Item from 'component/Item';
import Loader from 'component/Loader';

import Empty from 'assets/empty.png';

import * as S from 'page/ProductListPage/style';
import {useNavigate} from 'react-router-dom';
import useCartItem from 'hook/useCartItem';
import {PATH} from 'constant';
import ErrorBoundary from 'component/ErrorBoundary';

export default function ProductListPage() {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const productList = useSelector((state) => state.productListReducer.productList);
  const pending = useSelector((state) => state.productListReducer.pending);
  const cart = useSelector((state) => state.cartReducer.cart);

  const {addCartItem} = useCartItem();

  useEffect(() => {
    dispatch(getProductList());
  }, [dispatch]);

  const handleIconClick = ({image, name, price, id}) => {
    addCartItem({
      itemImgURL: image,
      itemName: name,
      itemPrice: price,
      id,
      count: 1,
    });
  };

  const handleImageClick = (id) => navigation(`${PATH.DETAIL}/${id}`);

  return (
    <S.ProductListPageLayout>
      {pending && <Loader />}
      <ErrorBoundary
        fallback={<img src={Empty} height="600px" />}
        pending={pending}
        error={!productList.length}
      >
        <S.ProductListBox>
          {productList.map(({id, image, name, price}) => {
            const isIncludeCart = cart.some((cartItem) => cartItem.id === id);
            return (
              <Item
                itemImgURL={image}
                itemName={name}
                itemPrice={price}
                id={id}
                key={id}
                disabled={isIncludeCart}
                handleIconClick={() => handleIconClick({image, name, price, id})}
                handleImageClick={() => handleImageClick(id)}
              />
            );
          })}
        </S.ProductListBox>
      </ErrorBoundary>
    </S.ProductListPageLayout>
  );
}

ProductListPage.propTypes = {
  itemList: PropTypes.array,
};
