import { ProductCardGrid } from '../components/main/productCardList/ProductCardList';
import { Layout } from '../layout';
import { useMockData } from '../hooks/useMockData';

function Main() {
  const { mockData } = useMockData();

  return (
    <Layout>
      <ProductCardGrid products={mockData} />
    </Layout>
  );
}

export default Main;
