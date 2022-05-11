import { useEffect, useState } from 'react';
import ProductCardGrid from '../../components/ProductCardGrid/ProductCardGrid';
import SERVER_URL from '../../configs/api';
import styled from 'styled-components';

function MainPage() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    fetch(`${SERVER_URL}/products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((body) => {
        setProductList(body);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <StyledPage>
      <ProductCardGrid productList={productList} />
    </StyledPage>
  );
}

const StyledPage = styled.div`
  margin: 60px 0;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export default MainPage;
