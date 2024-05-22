import { css } from '@emotion/react';

import { INFO_ICON } from '@assets/images';

const GuideText = ({ label }: { label: string }) => {
  return (
    <div css={freeDeliveryGuideWrapper}>
      <span css={infoIcon}>
        <img src={INFO_ICON} />
      </span>
      <span css={freeDeliveryGuide}>{label}</span>
    </div>
  );
};

export default GuideText;

const freeDeliveryGuideWrapper = css`
  display: flex;
  align-items: center;
  gap: 4px;

  height: 16px;
`;

const infoIcon = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
`;

const freeDeliveryGuide = css`
  font-size: 12px;
  font-weight: 500;
  color: #0a0d13;
`;
