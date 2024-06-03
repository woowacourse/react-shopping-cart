import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button/Button';
import { ROUTES } from '../constants/routes';
import { requestAddCartItem } from '../apis/requests/cartItem';
import Text from '../components/common/Text/Text';
import Flex from '../components/common/Flex/Flex';
import CenterBox from '../components/common/CenterBox/CenterBox';
import { useState } from 'react';

const StartPage = () => {
  const navigate = useNavigate();

  const [inputList, setInputList] = useState({ productId: '', quantity: '' });

  const addCartItemPresetList = () => {
    requestAddCartItem({ productId: 2, quantity: 1 });
    requestAddCartItem({ productId: 10, quantity: 1 });
    requestAddCartItem({ productId: 11, quantity: 1 });
  };

  const addCartItem = () => {
    requestAddCartItem({ productId: parseInt(inputList.productId), quantity: parseInt(inputList.quantity) });
  };

  return (
    <Flex
      gap="20px;"
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}
    >
      <Button onClick={() => navigate(ROUTES.CART_ORDERS)} color="primary">
        장바구니 페이지로 이동
      </Button>
      <Button onClick={addCartItemPresetList}>3개의 테스트 상품 추가하기</Button>

      <Flex>
        <CenterBox>
          <Text>직접 추가하기</Text>
          <Flex>
            <label>
              productId
              <input
                value={inputList.productId}
                onChange={(e) => setInputList({ ...inputList, productId: e.target.value })}
              />
            </label>
            <label>
              quantity
              <input
                value={inputList.quantity}
                onChange={(e) => setInputList({ ...inputList, quantity: e.target.value })}
              />
            </label>
          </Flex>
          <Button onClick={addCartItem}>직접 테스트 상품 추가하기</Button>
        </CenterBox>
      </Flex>
    </Flex>
  );
};

export default StartPage;
