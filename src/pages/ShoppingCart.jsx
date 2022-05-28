import React, { useEffect, useReducer, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ShoppingItem from '../components/ShoppingItem';
import { COLORS } from '../styles/theme';
import { StyledCheckbox } from '../components/common/Styled';
import { MESSAGE } from '../constants';
import useCart from '../hooks/useCart';
import Loading from '../components/Loading';

function ShoppingCart() {
  const { deleteItem } = useCart();
  const [totalPrice, setTotalPrice] = useState();
  const [selectedItems, setSelectedItems] = useState([]);
  const [isCheckedAll, setCheckedAll] = useReducer((checked) => !checked, true);
  const { data: cartList, isLoading, isError } = useSelector(({ cart }) => cart);

  const toggleCheckedAll = () => {
    if (!isCheckedAll) {
      setSelectedItems(cartList.map(({ id }) => id));
    } else {
      setSelectedItems([]);
    }
    setCheckedAll();
  };

  const deleteSelectedItems = () => {
    if (selectedItems.length === 0) return;

    if (window.confirm(MESSAGE.CHECK_DELETE)) {
      selectedItems.forEach((id) => deleteItem(id));
      setSelectedItems([]);
    }
  };

  const removeSelectedItem = (id) => {
    setSelectedItems(selectedItems.filter((cartId) => cartId !== id));
  };

  const handleSelectedItem = (id) => {
    if (selectedItems.includes(id)) {
      removeSelectedItem(id);
    } else {
      setSelectedItems((prevItem) => [...prevItem, id]);
    }
  };

  useEffect(() => {
    setSelectedItems(cartList.map(({ id }) => id));
  }, []);

  useEffect(() => {
    const selectedCarts = cartList.filter((item) => selectedItems.includes(item.id));
    const totalAmount = selectedCarts.reduce(
      (acc, { price, quantity }) => (acc += Number(price) * Number(quantity)),
      0
    );
    setTotalPrice(totalAmount);
  }, [cartList, selectedItems]);

  if (isError) return <h1>error</h1>;
  if (isLoading) return <Loading />;

  return (
    <StyledSection>
      <StyledHeader>
        <h1>장바구니</h1>
        <StyledDivideLine margin={20} size={2} color={COLORS.BLACK} />
      </StyledHeader>
      <StyledContainer>
        <StyledLeftSection>
          <StyledLeftDiv>
            <StyledCheckboxContainer>
              <StyledCheckbox
                name="checkbox"
                type="checkbox"
                checked={isCheckedAll}
                onChange={toggleCheckedAll}
              />
              <StyledLabel htmlfor="checkbox">선택해제</StyledLabel>
            </StyledCheckboxContainer>
            <StyledDeleteButton onClick={deleteSelectedItems}>상품삭제</StyledDeleteButton>
          </StyledLeftDiv>
          <StyledTitle>든든배송 상품({cartList.length}개)</StyledTitle>
          <StyledDivideLine margin={10} size={2} color={COLORS.GRAY} />
          {cartList.map((item) => (
            <React.Fragment key={item.id}>
              <ShoppingItem
                item={item}
                isCheckedAll={isCheckedAll}
                handleSelectedItem={handleSelectedItem}
                removeSelectedItem={removeSelectedItem}
              />
              <StyledDivideLine margin={10} size={1} color={COLORS.GRAY} />
            </React.Fragment>
          ))}
        </StyledLeftSection>
        <StyledRightSection>
          <StyledRightSectionTop>
            <StyledTitle>결제예상금액</StyledTitle>
          </StyledRightSectionTop>
          <StyledDivideLine margin={10} size={1} color={COLORS.GRAY} />
          <div>
            <StyledAmount>
              <StyledHighlight>결제예상금액</StyledHighlight>
              <StyledHighlight>{Number(totalPrice).toLocaleString()}원</StyledHighlight>
            </StyledAmount>
            <StyledOrderButtonWrapper>
              <StyledOrderButton>주문하기({selectedItems.length}개)</StyledOrderButton>
            </StyledOrderButtonWrapper>
          </div>
        </StyledRightSection>
      </StyledContainer>
    </StyledSection>
  );
}

const StyledDivideLine = styled.hr`
  width: 100%;
  margin: ${(props) => props.size};
  border: ${(props) => `${props.size}px solid ${props.color}`};
`;

const StyledSection = styled.section`
  width: 80%;
  margin: auto;
`;

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  h2 {
    font-size: 24px;
    font-weight: 600;
  }
`;

const StyledContainer = styled.div`
  display: flex;
`;

const StyledDeleteButton = styled.button`
  padding: 12px 22px;
  background-color: ${COLORS.WHITE};
  border: 1px solid ${COLORS.LIGHT_GRAY};
  border-radius: 4px;
  &:hover {
    background-color: ${COLORS.LIGHT_GRAY};
  }
`;

const StyledLeftSection = styled.section`
  width: 60%;
`;

const StyledLeftDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 45px 0;
`;

const StyledRightSection = styled.section`
  width: 35%;
  height: 260px;
  margin-left: 5%;
  margin-top: 80px;
  border: 1px solid #dddddd;
`;

const StyledTitle = styled.h3`
  display: flex;
  align-items: center;
  font-size: 20px;
`;

const StyledCheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledLabel = styled.label`
  padding-left: 7px;
`;

const StyledRightSectionTop = styled.div`
  display: flex;
  align-items: center;
  padding: 0 30px;
`;

const StyledAmount = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding: 20px;
`;

const StyledHighlight = styled.span`
  position: relative;
  font-weight: 700;
  display: inline-block;
  text-align: center;
  padding: 0 2px;
  font-size: 20px;
  &:after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 8px;
    background-color: ${COLORS.PRIMARY};
    opacity: 0.5;
    z-index: -1;
  }
`;

const StyledOrderButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0 20px;
`;

const StyledOrderButton = styled.button`
  background: ${COLORS.PRIMARY};
  font-size: 20px;
  color: ${COLORS.WHITE};
  width: 90%;
  padding: 15px;
  border: none;
  border-radius: 4px;
`;

export default ShoppingCart;
