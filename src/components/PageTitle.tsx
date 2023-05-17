import React, { PropsWithChildren } from 'react';
import { StyledText } from './common/Text';
import { styled } from 'styled-components';

export const PageTitle = ({ children }: PropsWithChildren) => {
  return (
    <TitleWrapper>
      <PageTitleText size="32px" weight="900" $color="var(--label-color)">
        {children}
      </PageTitleText>
    </TitleWrapper>
  );
};

const PageTitleText = styled(StyledText)`
  margin: 15px 0 20px 0;
`;

const TitleWrapper = styled.div`
  width: 100%;
  margin-bottom: 34px;
  text-align: center;
  border-bottom: 3px solid #333333;
`;
