import { RecoilRoot } from 'recoil';
import { Header } from './layouts/Header';
import { ProductList } from './pages/ProductList';

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <Header />
        <ProductList />
      </RecoilRoot>
    </div>
  );
}

export default App;
