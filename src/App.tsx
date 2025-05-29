import './App.css';
import CartItemsProvider from './contexts/CartItemsProvider';
import PageProvider from './contexts/PageProvider';
import PageController from './pages/PageController';

function App() {
  return (
    <>
      <h1>react-shopping-cart</h1>
      <PageProvider>
        <CartItemsProvider>
          <PageController />
        </CartItemsProvider>
      </PageProvider>
    </>
  );
}

export default App;
