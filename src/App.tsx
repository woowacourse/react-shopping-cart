import './App.css';
import Header from './components/common/Header/Header';
import HeaderButton from './components/common/Header/HeaderButton';
import { Logo } from './assets';
import ContainerLayout from './components/common/ContainerLayout/ContainerLayout';
import CartListTitle from './components/CartListTitle/CartListTitle';
import CartItem from './components/CartItem/CartItem';
import useCartList from './hooks/useCartList';
import CartList from './components/CartList/CartList';
import CartPriceInfo from './components/CartPriceInfo/CartPriceInfo';
import OrderButton from './components/OrderButton/OrderButton';
import EmptyCart from './components/EmptyCart/EmptyCart';
import { cartPrice } from './utils/cartPrice/cartPrice';
import { useEffect, useState } from 'react';

function App() {
  const { cartList, increaseCartItem, decreaseCartItem, deleteCartItem } =
    useCartList();

  const [seletedItems, setSeletedItems] = useState<number[]>([]);
  const isAllSelected = seletedItems.length === cartList.length;

  const handleSelectItem = (cartItemId: number) => {
    if (seletedItems.includes(cartItemId)) {
      const filtered = seletedItems.filter((item) => item !== cartItemId);
      setSeletedItems(filtered);
    } else {
      setSeletedItems((prev) => [...prev, cartItemId]);
    }
  };

  const handleSelectAllItems = () => {
    if (isAllSelected) {
      setSeletedItems([]);
    } else {
      setSeletedItems(cartList.map((cartItem) => cartItem.id));
    }
  };

  useEffect(() => {
    setSeletedItems(cartList.map((cartItem) => cartItem.id));
  }, [cartList]);

  const totalPrice = cartPrice.totalPrice(cartList, seletedItems);

  return (
    <>
      <Header>
        <HeaderButton src={Logo} onClick={() => {}} />
      </Header>
      <ContainerLayout>
        <CartListTitle cartListLength={cartList.length} />
        {cartList.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            <CartList
              isAllSelected={isAllSelected}
              handleSelecedAllItems={handleSelectAllItems}
            >
              {cartList.map((cartItem) => (
                <CartItem
                  key={cartItem.id}
                  cartItem={cartItem}
                  isSelected={seletedItems.includes(cartItem.id)}
                  handleSelectItem={handleSelectItem}
                  increaseCartItem={increaseCartItem}
                  decreaseCartItem={decreaseCartItem}
                  deleteCartItem={deleteCartItem}
                />
              ))}
            </CartList>
            <CartPriceInfo totalPrice={totalPrice} />
          </>
        )}
      </ContainerLayout>
      <OrderButton
        selectedCartData={cartList.filter((item) =>
          seletedItems.includes(item.id)
        )}
        totalPrice={totalPrice}
      />
    </>
  );
}

export default App;
