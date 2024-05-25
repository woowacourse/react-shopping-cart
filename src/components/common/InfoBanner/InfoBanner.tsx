import { UpsideDownExclamation } from '@assets/index';
import React from 'react';

import * as Styled from './InfoBanner.styled';

const InfoBanner: React.FC<
  React.PropsWithChildren<React.HtmlHTMLAttributes<HTMLDivElement>> & { $padding?: string }
> = ({ $padding, children, ...rest }) => {
  return (
    <Styled.InfoBanner $padding={$padding} {...rest}>
      <UpsideDownExclamation />
      <Styled.InfoText>{children}</Styled.InfoText>
    </Styled.InfoBanner>
  );
};

export default InfoBanner;
