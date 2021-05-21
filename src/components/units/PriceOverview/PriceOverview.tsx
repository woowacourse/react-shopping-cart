import React, { ReactElement } from 'react';
import Styled from './PriceOverview.styles';

type PriceOverviewProps = {
  headerText: string;
  children: React.ReactNode;
};

const PriceOverview = (props: PriceOverviewProps): ReactElement => {
  const { headerText, children } = props;

  return (
    <Styled.Root>
      <Styled.TotalPriceHeader>{headerText}</Styled.TotalPriceHeader>
      <Styled.Divider />
      <Styled.TotalPriceContent>{children}</Styled.TotalPriceContent>
    </Styled.Root>
  );
};

PriceOverview.defaultProps = {};

export default PriceOverview;
