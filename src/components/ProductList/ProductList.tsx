import { Products } from '../../types/Product';
import ProductCard from '../ProductCard/ProductCard';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { itemsState } from '../../recoil/atoms';
import styled from 'styled-components';
import CheckBox from '../CheckBox/CheckBox';
import { toggleAllSelector } from '../../recoil/selectors';
import { MESSAGES } from '../../constants/Messages';

const ProductListContainer = styled.div`
  margin-top: 3.6rem;
  margin-bottom: 5.2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const CheckBoxContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1.5rem;
`;

const CartItemListContainer = styled.ul`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

function ProductList() {
  const items = useRecoilValue(itemsState);

  const isAllChecked = useRecoilValue(toggleAllSelector);
  const setAllChecked = useSetRecoilState(toggleAllSelector);

  const handleToggleAll = () => {
    setAllChecked(!isAllChecked);
  };

  return (
    <ProductListContainer>
      <CheckBoxContainer>
        <CheckBox isChecked={isAllChecked} onClick={handleToggleAll} />
        {MESSAGES.allSelected}
      </CheckBoxContainer>

      <CartItemListContainer>
        {items.map((product: Products) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </CartItemListContainer>
    </ProductListContainer>
  );
}

export default ProductList;
