import styled from '@emotion/styled';
import { Modal, type ModalProps } from '@sebin0580/modal';

import { Button } from '@/shared/components/Button';
import { CheckBox } from '@/shared/components/CheckBox';
import { Flex } from '@/shared/components/Flex';
import { Text } from '@/shared/components/Text';

import { useCoupons } from '../hooks/useCoupons';
import { parseHour } from '../utils/parseHour';
import { splitDate } from '../utils/splitDate';

export const CouponModal = ({ isOpen, title, onClose }: ModalProps) => {
  const { coupons } = useCoupons();

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
        <Text type="Caption">🥸 쿠폰은 최대 2개까지 사용할 수 있습니다.</Text>
      </Flex>
      <StyledSpacing />
      {coupons?.map((item) => (
        <>
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
              <Text type="Title">{item.description}</Text>
            </Flex>
            <Text type="Caption">만료일: {splitDate(item.expirationDate)}</Text>
            {item.minimumAmount && (
              <Text type="Caption">최소 주문 금액: {item.minimumAmount.toLocaleString()}원</Text>
            )}
            {item.availableTime && (
              <Text type="Caption" color="#0A0D13">
                사용 가능 시간: 오전 {parseHour(item.availableTime.start)}시부터{' '}
                {parseHour(item.availableTime.end)}시까지
              </Text>
            )}
          </Flex>
          <StyledSpacing />
        </>
      ))}
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
