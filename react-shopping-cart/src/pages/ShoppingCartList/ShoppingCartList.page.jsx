import { useDispatch, useSelector } from 'react-redux';

import BorderBox from 'components/@shared/BorderBox/BorderBox.component';
import CheckBox from 'components/@shared/CheckBox/CheckBox.component';
import FlexBox from 'components/@shared/FlexBox/FlexBox.component';
import PageContainer from 'components/@shared/PageContainer/PageContainer.component';
import TextBox from 'components/@shared/TextBox/TextBox.component';
import TitleBox from 'components/@shared/TitleBox/TitleBox.component';

import Header from 'components/Header/Header.component';
import Loading from 'components/Loading/Loading.component';
import PaymentAmountContainer from 'components/PaymentAmountContainer/PaymentAmountContainer.component';
import ShoppingCartListContainer from 'components/ShoppingCartListContainer/ShoppingCartListContainer.component';

import { addAllItem, deleteAllItem } from 'redux/actions/orderList.action';
import { deleteItemList } from 'redux/actions/shoppingCart.action';

import useFetch from 'hooks/useFetch';

function ShoppingCartList() {
  const dispatch = useDispatch();
  const { data, isLoading } = useFetch(`${process.env.REACT_APP_API_HOST}/product`);
  const orderList = useSelector(state => state.orderList);
  const shoppingCart = useSelector(state => state.shoppingCart);

  const disabled = shoppingCart.length === 0;
  const checked = shoppingCart.length !== 0 && orderList.length === shoppingCart.length;

  const handleChangeCheckBox = () => {
    if (checked) {
      dispatch(deleteAllItem());
    } else {
      dispatch(addAllItem(shoppingCart));
    }
  };

  const handleClickDeleteBox = () => {
    if (orderList.length === 0) {
      alert('삭제할 상품이 존재하지 않습니다');
      return;
    }
    if (window.confirm(`${orderList.length}개의 상품을 장바구니에서 삭제하시겠습니까?`)) {
      dispatch(deleteItemList(orderList));
      dispatch(deleteAllItem());
    }
  };

  return (
    <>
      <Header />
      <FlexBox as="main" justifyContent="center">
        <PageContainer width="1320px" direction="column" alignItems="center">
          <TitleBox as="h1">장바구니</TitleBox>
          {isLoading ? (
            <Loading />
          ) : (
            <FlexBox width="1320px" justifyContent="space-between">
              <article>
                <h2 hidden>장바구니 상품들 리스트</h2>
                <FlexBox
                  width="736px"
                  height="80px"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <FlexBox gap="10px">
                    <CheckBox
                      disabled={disabled}
                      checked={checked}
                      onChange={() => handleChangeCheckBox()}
                    />
                    <TextBox fontSize="small">{checked ? '선택해제' : '전체선택'}</TextBox>
                  </FlexBox>
                  <BorderBox
                    width="117px"
                    height="50px"
                    lineHeight="50px"
                    textAlign="center"
                    cursor="pointer"
                    onClick={() => handleClickDeleteBox()}
                  >
                    상품삭제
                  </BorderBox>
                </FlexBox>
                <ShoppingCartListContainer data={data} />
              </article>
              <PaymentAmountContainer count={orderList.length} data={data} />
            </FlexBox>
          )}
        </PageContainer>
      </FlexBox>
    </>
  );
}

export default ShoppingCartList;
