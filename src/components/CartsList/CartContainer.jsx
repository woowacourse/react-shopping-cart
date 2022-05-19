import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import API_URL from '../../constants/api';
import PATH from '../../constants/path';
import useFetch from '../../hooks/useFetch';
import CheckBox from '../CheckBox/CheckBox';
import { BasicButton, BasicDivideLine, Flex } from '../shared/basics';
import TotalPrice from '../TotalPrice/TotalPrice';
import CartProductItem from './CartProductItem';

function CartContainer() {
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
      <Style.Header>
        <Style.Title>장바구니</Style.Title>
        <BasicDivideLine weight="bold" mv="20" />
      </Style.Header>

      <Style.Body justify="space-between">
        <Style.CartProductsContainer>
          <Style.CheckBoxContainer justify="space-between" align="center">
            <Flex align="center">
              <CheckBox />
              <Style.CheckBoxLabel>선택해제</Style.CheckBoxLabel>
            </Flex>
            <Style.DeleteButton type="button">상품삭제</Style.DeleteButton>
          </Style.CheckBoxContainer>
          <Style.CartTitle>든든배송 상품(3개)</Style.CartTitle>
          <BasicDivideLine weight="bold" color="lightgray" mv="10" />

          {!isStoredProductsLoading &&
            storedProducts?.map(({ id, price, title, src }) => (
              <CartProductItem key={id} price={price} title={title} src={src} />
            ))}
        </Style.CartProductsContainer>

        <TotalPrice />
      </Style.Body>
    </Style.Container>
  );
}

export default CartContainer;

const Style = {
  Container: styled.section`
    padding: 24px 300px;
  `,
  Header: styled.header`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
  `,
  Title: styled.h2`
    font-size: 24px;
    font-weight: 600;
    text-align: center;
  `,
  Body: styled(Flex)`
    padding: 0 20px;
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

  CartProductsContainer: styled.section`
    width: 60%;
  `,

  CartTitle: styled.h3`
    display: flex;
    align-items: center;
    font-size: 20px;
  `,
};
