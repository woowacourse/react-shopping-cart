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

const Cart = () => {
  const {
    isLoading,
    isSucceed,
    isError,
    data,
    handleDeleteItem,
    handleUpdateItemQuantity,
  } = useCart();
  const [selectedItemList, setSelectedItemList] = useState([]);

  const totalPrice = useMemo(() => {
    if (!data || data.length === 0) return 0;
    const list = data.filter(({ id }) => selectedItemList.indexOf(id) !== -1);
    return list.reduce(
      (prev, { price, quantity }) => (prev += price * quantity),
      0,
    );
  }, [data, selectedItemList]);

  const handleToggleSelectAll = (isSelected) => () => {
    if (isSelected) {
      setSelectedItemList([]);
      return;
    }
    setSelectedItemList(data.map(({ id }) => id));
  };

  const handleToggleSelect = (id) => () => {
    if (selectedItemList.indexOf(id) === -1) {
      setSelectedItemList([...selectedItemList, id]);
      return;
    }
    setSelectedItemList(selectedItemList.filter((itemId) => itemId !== id));
  };

  const handleDeleteSelectedItem = () => {
    if (selectedItemList.length === 0) return;
    selectedItemList.forEach((id) => handleDeleteItem(id)());
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
              selectedItemList.length === data.length && data.length > 0
            }
            onToggleSelect={handleToggleSelectAll(
              selectedItemList.length === data.length,
            )}
            onClickDeleteButton={handleDeleteSelectedItem}
          />

          <CartContainer>
            {isSucceed &&
              data.map(({ id, name, imgUrl, price, quantity }) => (
                <CartItem
                  key={id}
                  id={id}
                  name={name}
                  imgUrl={imgUrl}
                  price={price}
                  quantity={quantity}
                  isSelected={selectedItemList.indexOf(id) !== -1}
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
