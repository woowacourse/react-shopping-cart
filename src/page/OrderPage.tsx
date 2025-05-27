import { useNavigate } from 'react-router';
import Header from '../components/Header';

function OrderPage() {
  const navigate = useNavigate();

  return (
    <>
      <Header
        left={
          <button onClick={() => navigate(-1)}>
            <img src="./assets/back.svg" />
          </button>
        }
      />
    </>
  );
}

export default OrderPage;
