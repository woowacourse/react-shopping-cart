import { CheckBox } from '@/shared/components/CheckBox/CheckBox';
import { Flex } from '@/shared/components/Flex/Flex';
import { Text } from '@/shared/components/Text/Text';
import { useCartContext } from '../context/CartProvider';

export const RemoteAreaCheckBox = () => {
  const { isRemoteArea, toggleIsRemoteArea } = useCartContext();

  return (
    <Flex direction="column" justifyContent="flex-start" alignItems="flex-start" gap="10px">
      <Text type="Body" weight="semibold">
        배송 정보
      </Text>
      <Flex direction="row" justifyContent="flex-start" alignItems="center" gap="7px">
        <CheckBox checked={isRemoteArea} onChange={() => toggleIsRemoteArea()} />
        <Text type="Caption">제주도 및 도서 산간 지역</Text>
      </Flex>
    </Flex>
  );
};
