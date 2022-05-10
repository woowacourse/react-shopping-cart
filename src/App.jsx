import GlobalStyle from './GlobalStyle';
import ProductListContainer from './components/Main/ProductListContainer';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Header />
      <ProductListContainer />
    </div>
  );
}

export default App;
