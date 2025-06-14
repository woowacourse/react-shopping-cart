import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/components/Button';
import { Flex } from '@/shared/components/Flex';
import { Header } from '@/shared/components/Header';
import { Text } from '@/shared/components/Text';

export const EmptyOrder = () => {
  const navigate = useNavigate();

  const handleNavigateCart = () => {
    navigate('/cart');
  };

  return (
    <>
      <Header />
      <Flex
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        gap="0px"
        width="100%"
        height="100%"
        padding="20px 20px 10px 20px"
      >
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          gap="10px"
          width="100%"
          height="100%"
        >
          <Text type="Title">선택된 상품이 없습니다.</Text>
          <Text type="Body">장바구니에서 상품을 선택하고 다시 시도해주세요.</Text>
          <Button size="lg" onClick={handleNavigateCart}>
            장바구니로 돌아가기
          </Button>
        </Flex>
      </Flex>
    </>
  );
};
