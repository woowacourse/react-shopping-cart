import React from 'react';
import Styled from './PageHeader.styles';

interface PageHeaderProps {
  title: string;
}

const PageHeader = (props: PageHeaderProps) => {
  const { title } = props;

  return (
    <Styled.Root>
      <Styled.Title>{title}</Styled.Title>
    </Styled.Root>
  );
};

export default PageHeader;
