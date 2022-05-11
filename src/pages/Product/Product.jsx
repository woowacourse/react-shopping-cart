import { useParams } from 'react-router-dom';

const Product = () => {
  const { id } = useParams();
  return <div>Products {id}</div>;
};

export default Product;
