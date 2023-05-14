import React from 'react';
import Layout from '@components/common/Layout';
import PageRouterProvider from './router';

function App() {
  return (
    <Layout>
      <PageRouterProvider />
    </Layout>
  );
}

export default App;
