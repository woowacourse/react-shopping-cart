import useIsMountainIslandArea from '../../hooks/useIsMountainIslandArea';
import Checkbox from '../common/Checkbox/Checkbox';
import Text from '../common/Text/Text';

const ShippingAreaForm = () => {
  const { handleIsMountainIslandArea, isMountainIslandArea } = useIsMountainIslandArea();

  return (
    <>
      <Text>배송 정보</Text>
      <Checkbox
        handleClick={handleIsMountainIslandArea}
        checked={isMountainIslandArea}
        description={
          <Text size="s" weight="m">
            제주도 및 도서 산간 지역
          </Text>
        }
      />
    </>
  );
};

export default ShippingAreaForm;
