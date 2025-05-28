import './App.css';
import Header from './components/common/Header/Header';
import HeaderButton from './components/common/Header/HeaderButton';
import { Logo } from './assets';
import globalStyles from './styles/global.styles';
import { Global } from '@emotion/react';
import ContainerLayout from './components/common/ContainerLayout/ContainerLayout';
import CartListTitle from './components/CartListTitle/CartListTitle';
import CartItem from './components/CartItem/CartItem';

function App() {
  const response = fetch(`${import.meta.env.VITE_API_BASE_URL}/cart-items`, {
    method: 'GET',
  }).then((res) => res.json());

  console.log(response);
  return (
    <>
      <Global styles={globalStyles} />
      <Header>
        <HeaderButton src={Logo} onClick={() => {}} />
      </Header>
      <ContainerLayout>
        <CartListTitle />
        <CartItem />
      </ContainerLayout>
    </>
  );
}

export default App;
