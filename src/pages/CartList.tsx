import ContentLayout from 'src/components/@common/ContentLayout';
import Header from 'src/components/Header';
import { useGetFetch } from 'src/hooks/useFetch';
import { CartItem } from 'src/types';

const CartList = () => {
  const { data } = useGetFetch<CartItem[]>('/cart-items', []);

  return (
    <>
      <Header />
      <ContentLayout>
        {data.map((d) => (
          <div>{d.product.name}</div>
        ))}
      </ContentLayout>
    </>
  );
};

export default CartList;
