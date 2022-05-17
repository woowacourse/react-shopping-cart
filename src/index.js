import ReactDOM from 'react-dom/client';
import ShoppingCartApp from 'ShoppingCartApp';
import { worker } from 'mocks/browser';

if (process.env.NODE_ENV === 'development') {
  worker.start();
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ShoppingCartApp />);
