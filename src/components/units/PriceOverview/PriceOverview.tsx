import React from 'react';
import Styled from './PriceOverview.styles';

interface PriceOverviewProps {
  headerText: string;
  children: React.ReactNode;
  border?: boolean;
}

const PriceOverview = (props: PriceOverviewProps) => {
  const { headerText, children, border } = props;

  return (
    <Styled.Root border={border}>
      <Styled.TotalPriceHeader>{headerText}</Styled.TotalPriceHeader>
      <Styled.Divider />
      <Styled.TotalPriceContent>{children}</Styled.TotalPriceContent>
    </Styled.Root>
  );
};

PriceOverview.defaultProps = {
  border: true,
};

export default PriceOverview;
