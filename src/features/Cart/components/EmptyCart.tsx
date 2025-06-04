import { Flex } from '@/shared/components/Flex';
import { Header } from '@/shared/components/Header';
import { Text } from '@/shared/components/Text';

export const EmptyCart = () => {
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
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        gap="0px"
        width="100%"
        height="100%"
        padding="20px 20px 10px 20px"
      >
        <Flex
          direction="row"
          justifyContent="center"
          alignItems="center"
          gap="0"
          width="100%"
          height="100%"
        >
          <Text type="Title">장바구니가 비어있습니다.</Text>
        </Flex>
      </Flex>
    </>
  );
};
