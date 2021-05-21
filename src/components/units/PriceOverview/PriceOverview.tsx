import React, { ReactElement } from 'react';
import Styled from './PriceOverview.styles';

interface IProps {
  headerText: string;
  children: React.ReactNode;
}

const PriceOverview = (props: IProps): ReactElement => {
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
