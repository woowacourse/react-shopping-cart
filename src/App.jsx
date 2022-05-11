import ProductList from 'pages/ProductList';
import React from 'react';
import GlobalStyles from 'styles/globalStyles';
import Layout from 'component/common/Layout';

const App = () => {
  return (
    <div>
      <GlobalStyles />
      <Layout>
        <ProductList />
      </Layout>
    </div>
  );
};

export default App;
