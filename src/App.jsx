import { BrowserRouter } from 'react-router-dom';
import PageRoutes from 'PageRoutes';

function App() {
  return (
    <BrowserRouter basename="/react-shopping-cart">
      <PageRoutes />
    </BrowserRouter>
  );
}

export default App;
