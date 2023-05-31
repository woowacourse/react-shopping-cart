import styled from "styled-components";
import CheckBox from "../common/CheckBox/CheckBox";
import MiniButton from "../common/MiniButton/MiniButton";
import { useCheckBoxesToggler } from "../../hooks/useCheckBox";
import { useCartProductRemover } from "../../hooks/useCartProductRemover";

const BUNDLE_ID = -1;

const CheckBoxSelectBundle = () => {
  const { getIsChecked, setAllCheckBoxes } = useCheckBoxesToggler();
  const { removeCheckedCartProducts } = useCartProductRemover();

  return (
    <Container>
      <CheckBox
        isChecked={getIsChecked(BUNDLE_ID)}
        onCheckedChange={() => {
          setAllCheckBoxes(!getIsChecked(BUNDLE_ID));
        }}
      />
      <CheckedStatus>전체선택</CheckedStatus>
      <MiniButton
        type="button"
        onClick={removeCheckedCartProducts}
        width="98px"
      >
        선택삭제
      </MiniButton>
    </Container>
  );
};

const styles = {
  lightGray: "#bebebe",
};

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 295px;
  height: 35px;
  margin: 30px 15px;
  gap: 15px;
`;

const CheckedStatus = styled.span`
  width: 140px;
  font-size: 18px;
  color: ${styles.lightGray};
`;

export default CheckBoxSelectBundle;
