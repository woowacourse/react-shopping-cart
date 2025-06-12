import styled from '@emotion/styled';
import CheckBox from '../components/CheckBox';
import useCheckedCartActions from '../hooks/useCheckedCartActions';
import { useCheckCartIdsContext } from '../contexts/CheckedCartIds/CheckedCartIdsContext';

const AllCheckSection = () => {
  const { isAllChecked } = useCheckCartIdsContext();
  const { toggleAllChecked } = useCheckedCartActions();

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
