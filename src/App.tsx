import './App.css';
import CartItemsProvider from './contexts/CartItemsProvider';
import CartPage from './pages/CartPage';

function App() {
  return (
    <>
      <h1>react-shopping-cart</h1>
      <CartItemsProvider>
        <CartPage />
      </CartItemsProvider>
    </>
  );
}

export default App;
