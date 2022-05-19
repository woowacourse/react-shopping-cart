import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import API_URL from '../../constants/api';
import PATH from '../../constants/path';
import useFetch from '../../hooks/useFetch';
import CheckBox from '../CheckBox/CheckBox';
import { BasicButton, BasicDivideLine, Flex } from '../shared/basics';
import CartItem from './CartItem';

function CartListContainer() {
  const { carts } = useSelector((state) => state.carts);
  const query = carts.length
    ? carts.map((cart) => `id=${cart.id}`).join('&')
    : '';
  const {
    isLoading: isStoredProductsLoading,
    result: storedProducts,
    apiCall,
  } = useFetch({
    url: `${API_URL}/${PATH.PRODUCTS}?${query}`,
  });

  useEffect(() => {
    apiCall();
  }, [query]);

  return (
    <Style.Container>
      <Style.CheckBoxContainer justify="space-between" align="center">
        <Flex align="center">
          <CheckBox />
          <Style.CheckBoxLabel>전체선택</Style.CheckBoxLabel>
        </Flex>
        <Style.DeleteButton type="button">상품삭제</Style.DeleteButton>
      </Style.CheckBoxContainer>
      <Style.CartTitle>{`든든배송 상품(${carts?.length}개)`}</Style.CartTitle>
      <BasicDivideLine weight="bold" color="lightgray" mv="10" />
      {!isStoredProductsLoading &&
        storedProducts?.map(({ id, price, title, src }) => (
          <CartItem key={id} price={price} title={title} src={src} />
        ))}
    </Style.Container>
  );
}

export default CartListContainer;

const Style = {
  Container: styled.section`
    width: 60%;
  `,
  CheckBoxContainer: styled(Flex)`
    margin: 20px 0;
  `,
  DeleteButton: styled(BasicButton)`
    padding: 12px 22px;
    border: 1px solid #bbbbbb;
  `,
  CheckBoxLabel: styled.span`
    padding-left: 7px;
  `,
  CartTitle: styled.h3`
    display: flex;
    align-items: center;
    font-size: 20px;
  `,
};
