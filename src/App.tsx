import ProductItem from './components/ProductItem';

const App = () => {
  return (
    <>
      <ProductItem
        imgSrc={`${process.env.PUBLIC_URL}/assets/product1.svg`}
        name="test"
        price={1000}
        isSelected={false}
      />
    </>
  );
};

export default App;
