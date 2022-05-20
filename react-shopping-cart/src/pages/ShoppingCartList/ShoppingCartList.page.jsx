import { useDispatch, useSelector } from 'react-redux';
import Header from 'components/Header/Header.component';
import PageContainer from 'components/@shared/PageContainer/PageContainer.component';
import TitleBox from 'components/@shared/TitleBox/TitleBox.component';
import FlexBox from 'components/@shared/FlexBox/FlexBox.component';
import PaymentAmountContainer from 'components/PaymentAmountContainer/PaymentAmountContainer.component';
import CheckBox from 'components/@shared/CheckBox/CheckBox.component';
import TextBox from 'components/@shared/TextBox/TextBox.component';
import BorderBox from 'components/@shared/BorderBox/BorderBox.component';
import ShoppingCartListContainer from 'components/ShoppingCartListContainer/ShoppingCartListContainer.component';
import Loading from 'components/Loading/Loading.component';
import useFetch from 'hooks/useFetch';
import { useEffect, useState } from 'react';
import { addAllItem, deleteAllItem } from 'redux/actions/orderList.action';
import { deleteItem } from 'redux/actions/shoppingCart.action';

function ShoppingCartList() {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useFetch(`${process.env.REACT_APP_API_HOST}/product`);
  const orderList = useSelector(state => state.orderList);
  const shoppingCart = useSelector(state => state.shoppingCart);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(orderList.length === shoppingCart.length);
  }, [orderList, shoppingCart]);

  const handleChangeCheckBox = () => {
    if (checked) {
      dispatch(deleteAllItem());
    } else {
      dispatch(addAllItem(shoppingCart));
    }
  };

  const handleClickDeleteBox = () => {
    if (window.confirm(`${orderList.length}개의 상품을 장바구니에서 삭제하시겠습니까?`)) {
      orderList.forEach(itemId => {
        dispatch(deleteItem(itemId));
      });
      dispatch(deleteAllItem());
    }
  };

  return (
    <>
      <Header />
      <FlexBox justifyContent="center">
        <PageContainer width="1320px" direction="column" alignItems="center">
          <TitleBox>장바구니</TitleBox>
          <FlexBox width="1320px" justifyContent="space-between">
            <div>
              <FlexBox
                width="736px"
                height="80px"
                justifyContent="space-between"
                alignItems="center"
              >
                <FlexBox gap="10px">
                  <CheckBox checked={checked} onChange={() => handleChangeCheckBox()} />
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
              {isLoading ? <Loading /> : <ShoppingCartListContainer data={data} />}
            </div>
            {!isLoading && <PaymentAmountContainer count={orderList.length} data={data} />}
          </FlexBox>
        </PageContainer>
      </FlexBox>
    </>
  );
}

export default ShoppingCartList;
