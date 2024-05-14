import { useLoaderData, Await } from 'react-router-dom';
import CartItem from '../../components/CartItem/CartItem';
import { TCartItem } from './ShoppingCartPage.type';

function ShoppingCartPage() {
  const data = useLoaderData() as TCartItem[];

  return (
    <>
      <div>ShoppingCartPage</div>
      <Await resolve={data}>
        {data.map((el) => (
          <CartItem item={el} />
        ))}
      </Await>
    </>
  );
}

export default ShoppingCartPage;
