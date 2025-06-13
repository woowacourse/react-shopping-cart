import styled from '@emotion/styled';
import { Title } from '../Cart/CartPrice';
import {
  CheckboxContainer,
  HiddenCheckbox,
  ModifyRow,
  StyledCheckbox,
} from '../SelectBox/SelectBox.styles';
import { useShipping } from '../../context/ShippingContext';

function ShippingInfo() {
  const { isExtraShippingFee, toggleExtraShippingFee } = useShipping();

  return (
    <Container>
      <Title>배송 정보</Title>
      <SelectContainer>
        <ModifyRow>
          <CheckboxContainer>
            <HiddenCheckbox
              type="checkbox"
              checked={isExtraShippingFee}
              onChange={toggleExtraShippingFee}
            />
            <StyledCheckbox checked={isExtraShippingFee} />
          </CheckboxContainer>
          <span>제주도 및 도서 산간 지역</span>
        </ModifyRow>
      </SelectContainer>
    </Container>
  );
}
export default ShippingInfo;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 32px 0;
`;

const SelectContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  line-height: 150%;
  color: #0a0d13;
`;
