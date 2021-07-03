import React, { ReactElement } from 'react';
import Styled from './PageHeader.styles';

interface Props {
  title: string;
}

const PageHeader = (props: Props): ReactElement => {
  const { title } = props;

  return (
    <Styled.Root>
      <Styled.Title>{title}</Styled.Title>
    </Styled.Root>
  );
};

export default PageHeader;
