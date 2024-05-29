import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isIslandOrMountainRegionState } from "../../recoil/cartAmount";

export default function DeliveryInfo() {
  const [isIslandOrMountainRegion, setIsIslandOrMountainRegion] =
    useRecoilState(isIslandOrMountainRegionState);

  const handleCheckboxChange = () => {
    setIsIslandOrMountainRegion((prev) => !prev);
  };

  return (
    <S.Container>
      <S.Title>배송 정보</S.Title>

      <S.CheckboxWrapper>
        <S.Checkbox
          id="select-all-checkbox"
          type="checkbox"
          checked={isIslandOrMountainRegion}
          onChange={handleCheckboxChange}
        />
        <S.CheckboxLabel htmlFor="select-all-checkbox">
          제주도 및 도서 산간 지역
        </S.CheckboxLabel>
      </S.CheckboxWrapper>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,

  Title: styled.div`
    font-weight: 700;
    size: 16px;
    color: rgba(10, 13, 19, 1);
  `,

  CheckboxWrapper: styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
  `,

  Checkbox: styled.input`
    accent-color: black;
    margin: 0;
    width: 24px;
    height: 24px;
  `,

  CheckboxLabel: styled.label`
    font-size: 12px;
    font-weight: 500;
    line-height: 15px;
  `,
};
