import styled from 'styled-components';
import CheckBox from '../CheckBox/CheckBox';
import { useRecoilState } from 'recoil';
import { shippingInformationState } from '../../recoil/atoms';
import { MESSAGES } from '../../constants/Messages';

const Container = styled.li`
  display: flex;
  flex-direction: column;
  padding: 1rem 0 0 0;
  gap: 1rem;
`;

const Title = styled.h2`
  font-size: 1.6rem;
  font-weight: 700;
`;
const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const CheckBoxInfo = styled.span`
  display: flex;
  font-size: 1.2rem;
`;
function ShippingInformation() {
  const [shippingInformation, setShippingInformation] = useRecoilState(
    shippingInformationState,
  );
  const handleCheckedItem = () => {
    setShippingInformation((prevState) => !prevState);
  };

  return (
    <Container>
      <Title>{MESSAGES.shippingInformation}</Title>
      <CheckBoxWrapper>
        <CheckBox isChecked={shippingInformation} onClick={handleCheckedItem} />
        <CheckBoxInfo>{MESSAGES.additionalShippingFee}</CheckBoxInfo>
      </CheckBoxWrapper>
    </Container>
  );
}

export default ShippingInformation;
