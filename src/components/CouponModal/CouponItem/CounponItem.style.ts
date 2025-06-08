import { css } from '@emotion/react';

const listLayout = (disabled: boolean) => {
  return css`
    padding: 0px;
    list-style-type: none;
    padding-bottom: 24px;

    ${disabled &&
    css`
      background: #fefefe;
      opacity: 0.2;
      pointer-events: none; // 클릭 등 모든 사용자 상호작용 차단
      user-select: none; // 텍스트 드래그도 막음
    `}
  `;
};

const checkBoxWrapper = css`
  display: flex;
  align-items: center;
  gap: 4.5px;
  margin-top: 16px;
  margin-bottom: 12px;
`;

const labelText = css`
  font-weight: 500;
  font-size: 16px;
  font-weight: 700;
`;

const descriptionTextBox = css`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const descriptionText = css`
  font-weight: 500;
  font-size: 12px;
`;

export {
  listLayout,
  checkBoxWrapper,
  labelText,
  descriptionTextBox,
  descriptionText,
};
