import styled from '@emotion/styled';
import CheckBox from '../components/CheckBox';
import useCheckedCartIdsActions from '../hooks/useCheckedCartIdsActions';

const AllCheckSection = () => {
  const { isAllChecked, toggleAllChecked } = useCheckedCartIdsActions();

  return (
    <S.Container data-testid="allCheckSection">
      <CheckBox checked={isAllChecked} onChange={toggleAllChecked} />
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
