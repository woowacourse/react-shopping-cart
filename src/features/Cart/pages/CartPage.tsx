import { AppLayout } from '@/shared/components/AppLayout';
import { CheckBox } from '@/shared/components/CheckBox';
import { Flex } from '@/shared/components/Flex';
import { Header } from '@/shared/components/Header';
import { Text } from '@/shared/components/Text';

export const CartPage = () => {
  return (
    <AppLayout>
      <Header
        left={
          <Text type="Heading" weight="semibold" color="white">
            SHOP
          </Text>
        }
      />
      <Flex
        direction={'column'}
        justifyContent={'flex-start'}
        alignItems={'flex-start'}
        gap={'10px'}
        width="100%"
        padding="20px"
      >
        <Text type={'Heading'} weight="semibold">
          장바구니
        </Text>
        <Text type={'Caption'} weight="regular">
          현재 2종류의 상품이 담겨있습니다.
        </Text>
        <CheckBox checked={false} />
        <Text type={'Caption'} weight="regular">
          전체선택
        </Text>
      </Flex>
    </AppLayout>
  );
};
