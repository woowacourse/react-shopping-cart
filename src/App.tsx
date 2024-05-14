import { useEffect, useState } from "react";
import "./App.css";
import { fetchCartItems } from "./api/CartItem";
import { Product } from "./types";

function App() {
  const [cardItems, setCartItmes] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchCartItems();
        setCartItmes(data);
      } catch (error) {
        setError(error as Error);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <h1>react-shopping-cart</h1>
      <div>
        {cardItems.map((item, index) => (
          <div key={index}>
            {item.id} {item.quantity}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
