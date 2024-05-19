import { addCartItem } from '../../api';
import { AddItemsToServerButton, BlankCartContainer } from './styles';

const BlankCart: React.FC = () => {
  const handleClick = () => {
    [2, 3, 10, 11, 12].forEach(async (id) => {
      await addCartItem(id);
    });
  };

  return (
    <BlankCartContainer>
      <p>장바구니에 담은 상품이 없습니다.</p>

      <AddItemsToServerButton onClick={handleClick}>
        서버에 데이터 추가하기
      </AddItemsToServerButton>
    </BlankCartContainer>
  );
};

export default BlankCart;
