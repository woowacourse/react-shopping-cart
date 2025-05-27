import { AppLayout } from '@/shared/components/AppLayout';
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
      >
        장바구니
      </Header>
      <div>아아</div>
    </AppLayout>
  );
};
