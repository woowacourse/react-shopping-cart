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

function App() {
  const { cartList, increaseCartItem, decreaseCartItem, deleteCartItem } =
    useCartList();

  const totalPrice = cartPrice.totalPrice(cartList);

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
            <CartList>
              {cartList.map((cartItem) => (
                <CartItem
                  key={cartItem.id}
                  cartItem={cartItem}
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
      <OrderButton cartData={cartList} totalPrice={totalPrice} />
    </>
  );
}

export default App;
