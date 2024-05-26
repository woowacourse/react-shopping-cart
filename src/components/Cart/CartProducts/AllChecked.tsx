import { css } from '@emotion/react';
import { ChangeEvent } from 'react';
import { useRecoilState } from 'recoil';

import Checkbox from '@components/common/Checkbox';
import { isAllCheckedState } from '@globalState/cartItems/selectors';

export default function AllChecked() {
  const [isAllChecked, setIsAllChecked] = useRecoilState(isAllCheckedState);

  const handleClickCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setIsAllChecked(e.target.checked);
  };

  return (
    <div css={allCheckedContainer}>
      <Checkbox
        labelHidden={false}
        checked={isAllChecked}
        onChange={handleClickCheck}
        id="전체 선택"
        label="전체 선택"
      />
    </div>
  );
}

const allCheckedContainer = css`
  padding-bottom: 20px;
`;
