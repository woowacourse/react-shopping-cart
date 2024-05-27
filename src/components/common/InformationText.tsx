import { css } from '@emotion/react';
import { PropsWithChildren } from 'react';

import { INFO_ICON } from '@assets/images';

export default function InformationText({ children }: PropsWithChildren) {
  return (
    <div css={informationWrapper}>
      <span css={informationIcon}>
        <img src={INFO_ICON} alt="중요 정보" />
      </span>
      <span css={informationText}>{children}</span>
    </div>
  );
}

const informationWrapper = css`
  display: flex;
  align-items: center;
  gap: 4px;

  height: 16px;
`;

const informationIcon = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
`;

const informationText = css`
  font-size: 12px;
  font-weight: 500;
  color: #0a0d13;
`;
