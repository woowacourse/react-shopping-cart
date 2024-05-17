import { css } from '@emotion/react';
import { useRecoilState } from 'recoil';

import { CHECKED, UNCHECKED } from '@assets/images';
import { allCheckedState } from '@recoil/cartItems/selectors';

const AllCheckBox = () => {
  const [allChecked, setAllChecked] = useRecoilState(allCheckedState);

  return (
    <>
      <input
        id="allChecked"
        type="checkbox"
        checked={allChecked}
        css={srOnly}
        onChange={(e) => setAllChecked(e.target.checked)}
      />
      <label css={label} htmlFor="allChecked">
        <img src={allChecked ? CHECKED : UNCHECKED} css={checkIcon} />
        <span css={labelText}>전체 선택</span>
      </label>
    </>
  );
};

export default AllCheckBox;

const srOnly = css`
  position: absolute;

  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  border: 0;

  overflow: hidden;
  clip-path: inset(50%);
  clip: rect(0 0 0 0);
`;

const label = css`
  display: flex;
  align-items: center;
  gap: 8px;

  height: 24px;

  padding-bottom: 20px;
`;

const labelText = css`
  font-size: 12px;
  font-weight: 400;
`;

const checkIcon = css`
  width: 24px;
  height: 24px;

  cursor: pointer;
`;
