import './App.css';
import Header from './components/common/Header/Header';
import HeaderButton from './components/common/Header/HeaderButton';
import { Logo } from './assets';
import globalStyles from './styles/global.styles';
import { Global } from '@emotion/react';
import ContainerLayout from './components/common/ContainerLayout/ContainerLayout';
import Text from './components/common/Text/Text';

function App() {
  return (
    <>
      <Global styles={globalStyles} />
      <Header>
        <HeaderButton src={Logo} onClick={() => {}} />
      </Header>
      <ContainerLayout>
        <Text varient="title">react-shopping-cart</Text>
      </ContainerLayout>
    </>
  );
}

export default App;
