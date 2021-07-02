import React, { ReactElement } from 'react';
import Styled from './PriceOverview.styles';

interface Props {
  headerText: string;
  children: React.ReactNode;
}

const PriceOverview = (props: Props): ReactElement => {
  const { headerText, children } = props;

  return (
    <Styled.Root>
      <Styled.TotalPriceHeader>{headerText}</Styled.TotalPriceHeader>
      <Styled.Divider />
      <Styled.TotalPriceContent>{children}</Styled.TotalPriceContent>
    </Styled.Root>
  );
};

export default PriceOverview;
