import styled from '@emotion/styled';
import CheckBox from '../components/CheckBox';
import { useCheckedCartItemsContext } from '../contexts/CheckedCartItemContext';

const AllCheckSection = () => {
  const { isAllChecked, toggleAllChecked } = useCheckedCartItemsContext();

  return (
    <S.Container data-testid="allCheckSection">
      <CheckBox isChecked={isAllChecked} onClick={toggleAllChecked} />
      <p>전체 선택</p>
    </S.Container>
  );
};

export default AllCheckSection;

const S = {
  Container: styled.section`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 24px;
  `,
};
