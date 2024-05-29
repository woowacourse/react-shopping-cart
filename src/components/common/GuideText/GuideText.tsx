import { freeDeliveryGuide, freeDeliveryGuideWrapper, infoIcon } from './GuideText.styled';

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
