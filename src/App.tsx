import Header from './components/common/header/Header';
import CartContents from './components/features/cart/cartContents/CartContents';

function App() {
  return (
    <>
      <Header title="SHOP" showBackButton={true} />
      <CartContents />
    </>
  );
}

export default App;
