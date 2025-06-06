import styled from '@emotion/styled';
import { Modal, type ModalProps } from '@sebin0580/modal';

import { Button } from '@/shared/components/Button';
import { CheckBox } from '@/shared/components/CheckBox';
import { Flex } from '@/shared/components/Flex';
import { Text } from '@/shared/components/Text';

export const CouponModal = ({ isOpen, title, onClose }: ModalProps) => {
  return (
    <Modal isOpen={isOpen} title={title} onClose={onClose}>
      <Flex
        width="100%"
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        gap="10px"
        padding="10px 0"
      >
        <Text type="Caption">쿠폰은 최대 2개까지 사용할 수 있습니다.</Text>
      </Flex>
      <StyledSpacing />
      <Flex
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        gap="3px"
        width="100%"
        padding="10px 0 20px 0"
      >
        <Flex
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          gap="10px"
          padding="5px 0"
        >
          <CheckBox checked={true} />
          <Text type="Title">5,000원 할인 쿠폰</Text>
        </Flex>
        <Text type="Caption">만료일: 2024년 11월 30일</Text>
        <Text type="Caption">최소 주문 금액: 100,000원</Text>
      </Flex>
      <StyledSpacing />
      <Flex
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        gap="3px"
        width="100%"
        padding="10px 0 20px 0"
      >
        <Flex
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          gap="10px"
          padding="10px 0"
        >
          <CheckBox checked={true} />
          <Text type="Title">2개 구매 시 1개 무료 쿠폰</Text>
        </Flex>
        <Text type="Caption">만료일: 2024년 5월 30일</Text>
      </Flex>
      <StyledSpacing />
      <Flex
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        gap="3px"
        width="100%"
        padding="10px 0 20px 0"
      >
        <Flex
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          gap="10px"
          padding="10px 0"
        >
          <CheckBox checked={true} />
          <Text type="Title">5만원 이상 구매 시 무료 배송 쿠폰</Text>
        </Flex>
        <Text type="Caption">만료일: 2024년 8월 31일</Text>
        <Text type="Caption">최소 주문 금액: 50,000원</Text>
      </Flex>
      <Button size="lg" width="100%" onClick={onClose}>
        총 6,000원 할인 쿠폰 사용하기
      </Button>
    </Modal>
  );
};

const StyledSpacing = styled.hr`
  width: 100%;
  height: 1px;
  background-color: rgb(218, 218, 218);
  border: none;
  margin: 0;
`;
