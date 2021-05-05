import { FC } from 'react';
import { TemplateContainer, InnerTemplateContainer, Title } from './styles';

interface Props {
  children: React.ReactNode;
  backgroundColor?: string;
  title?: string;
}

const Template: FC<Props> = ({ children, backgroundColor, title }) => {
  return (
    <TemplateContainer backgroundColor={backgroundColor}>
      <InnerTemplateContainer>
        {title && <Title>{title}</Title>}
        {children}
      </InnerTemplateContainer>
    </TemplateContainer>
  );
};

export default Template;
