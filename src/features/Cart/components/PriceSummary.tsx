import { Flex } from '@/shared/components/Flex';
import { Text } from '@/shared/components/Text';
import styled from '@emotion/styled';

export const PriceSummary = () => {
  return (
    <Flex
      direction={'column'}
      justifyContent={'flex-start'}
      alignItems={'flex-start'}
      gap={'10px'}
      width="100%"
      padding="20px"
    >
      <Text type={'Caption'} weight="regular">
        🛍️ 총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
      </Text>
      <StyledSpacing />
      <Flex
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        gap="0"
        width="100%"
        padding="0 10px"
      >
        <Text type="Body">주문 금액</Text>
        <Text type="Heading">70,000원</Text>
      </Flex>
      <Flex
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        gap="0"
        width="100%"
        padding="0 10px"
      >
        <Text type="Body">배송비</Text>
        <Text type="Heading">3,000원</Text>
      </Flex>
      <StyledSpacing />
      <Flex
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        gap="0"
        width="100%"
        padding="0 10px"
      >
        <Text type="Body">총 결제 금액</Text>
        <Text type="Heading">73,000원</Text>
      </Flex>
    </Flex>
  );
};

const StyledSpacing = styled.hr`
  width: 100%;
  height: 2px;
  color: rgb(244, 244, 244);
`;
