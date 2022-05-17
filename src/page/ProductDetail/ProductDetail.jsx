import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function ProductDetail() {
  const { products, selectedProductId } = useSelector(store => store);
  const targetProduct = products.find(product => product.id === selectedProductId);

  console.log(targetProduct);

  return (
    <Content>
      <img src={targetProduct.image} />
      <p>{targetProduct.name}</p>
      <p>{targetProduct.price}</p>
    </Content>
  );
}

export default ProductDetail;
