import React, { ReactElement } from 'react';
import Styled from './PageHeader.styles';

type PageHeaderProps = {
  title: string;
};

const PageHeader = (props: PageHeaderProps): ReactElement => {
  const { title } = props;

  return (
    <Styled.Root>
      <Styled.Title>{title}</Styled.Title>
    </Styled.Root>
  );
};

export default PageHeader;
