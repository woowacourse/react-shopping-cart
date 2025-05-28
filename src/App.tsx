import './App.css';
import Header from './components/common/Header/Header';
import HeaderButton from './components/common/Header/HeaderButton';
import { Logo } from './assets';
import globalStyles from './styles/global.styles';
import { Global } from '@emotion/react';
import ContainerLayout from './components/common/ContainerLayout/ContainerLayout';
import CartListTitle from './components/CartListTitle/CartListTitle';
import CartItem from './components/CartItem/CartItem';
import useCartList from './hooks/useCartList';
import CartList from './components/CartList/CartList';
import CartPriceInfo from './components/CartPriceInfo/CartPriceInfo';

function App() {
  const { cartList } = useCartList();

  console.log(cartList);

  return (
    <>
      <Global styles={globalStyles} />
      <Header>
        <HeaderButton src={Logo} onClick={() => {}} />
      </Header>
      <ContainerLayout>
        <CartListTitle />
        <CartList>
          {cartList.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))}
        </CartList>
        <CartPriceInfo />
      </ContainerLayout>
    </>
  );
}

export default App;
