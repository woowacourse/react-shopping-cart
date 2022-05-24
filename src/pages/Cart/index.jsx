import Styled from './style';
import CartContainer from 'components/CartContainer/CartContainer';
import CartItem from 'components/CartItem/CartItem';
import CartControlBar from 'components/CartControlBar/CartControlBar';
import Title from 'components/Title/Title';
import PaymentBox from 'components/PaymentBox/PaymentBox';
import { useState, useMemo } from 'react';
import useCart from 'hooks/useCart';

import ImgWrapper from 'components/ImgWrapper/ImgWrapper';
import spinner from 'assets/svg/spinner.svg';
import errorApiImg from 'assets/png/errorApiImg.png';

const isInList = (list, item) => {
  return list.indexOf(item) !== -1;
};

const Cart = () => {
  const {
    isLoading,
    isError,
    cartItems,
    handleDeleteItem,
    handleUpdateItemQuantity,
  } = useCart();

  const [selectedItemList, setSelectedItemList] = useState([]);

  const totalPrice = useMemo(() => {
    if (!cartItems || cartItems.length === 0) return 0;
    const selectedItems = cartItems.filter(({ id }) =>
      isInList(selectedItemList, id),
    );
    return selectedItems.reduce(
      (prev, { price, quantity }) => (prev += price * quantity),
      0,
    );
  }, [cartItems, selectedItemList]);

  const handleToggleSelectAll = (isSelected) => () => {
    if (isSelected) {
      setSelectedItemList([]);
      return;
    }
    setSelectedItemList(cartItems.map(({ id }) => id));
  };

  const handleToggleSelect = (id) => () => {
    if (!isInList(selectedItemList, id)) {
      setSelectedItemList([...selectedItemList, id]);
      return;
    }
    setSelectedItemList(selectedItemList.filter((itemId) => itemId !== id));
  };

  const handleDeleteSelectedItem = () => {
    if (selectedItemList.length === 0) return;

    selectedItemList.forEach((id) => handleDeleteItem(id));
    setSelectedItemList([]);
  };

  return (
    <Styled.Wrapper>
      <Title contents="장바구니" />
      {isLoading && <ImgWrapper src={spinner} />}
      {isError && <ImgWrapper src={errorApiImg} />}
      <Styled.ContentsWrapper>
        <Styled.CartContents>
          <CartControlBar
            isAllSelected={
              selectedItemList.length === cartItems?.length &&
              cartItems?.length > 0
            }
            onToggleSelect={handleToggleSelectAll(
              selectedItemList.length === cartItems?.length,
            )}
            onClickDeleteButton={handleDeleteSelectedItem}
          />

          <CartContainer>
            {cartItems &&
              cartItems.map(({ id, name, imgUrl, price, quantity }) => (
                <CartItem
                  key={id}
                  id={id}
                  name={name}
                  imgUrl={imgUrl}
                  price={price}
                  quantity={quantity}
                  isSelected={isInList(selectedItemList, id)}
                  onToggleSelect={handleToggleSelect(id)}
                  onChangeQuantity={handleUpdateItemQuantity(id)}
                  onDeleteItem={handleDeleteItem(id)}
                />
              ))}
          </CartContainer>
        </Styled.CartContents>
        <Styled.PaymentBoxWrapper>
          <PaymentBox quantity={selectedItemList.length} price={totalPrice} />
        </Styled.PaymentBoxWrapper>
      </Styled.ContentsWrapper>
    </Styled.Wrapper>
  );
};

export default Cart;
