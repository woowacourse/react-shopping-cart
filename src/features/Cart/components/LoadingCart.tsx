import { Flex } from '@/shared/components/Flex';
import { Header } from '@/shared/components/Header';
import { Loading } from '@/shared/components/Loading';
import { Text } from '@/shared/components/Text';

export const LoadingCart = () => {
  return (
    <>
      <Header
        left={
          <Text type="Heading" weight="semibold" color="white">
            SHOP
          </Text>
        }
      />
      <Flex
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap=""
        width="100%"
        height="100dvh"
      >
        <Loading size="xl" />
      </Flex>
    </>
  );
};
