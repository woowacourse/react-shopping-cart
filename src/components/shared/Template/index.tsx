import { FC } from 'react';
import { TemplateContainer, InnerTemplateContainer, Title } from './styles';

interface Props {
  children: React.ReactNode;
  backgroundColor?: string;
  title?: string;
  innerWidth?: string;
}

const Template: FC<Props> = ({ children, backgroundColor, title, innerWidth }) => {
  return (
    <TemplateContainer backgroundColor={backgroundColor}>
      <InnerTemplateContainer width={innerWidth}>
        {title && <Title>{title}</Title>}
        {children}
      </InnerTemplateContainer>
    </TemplateContainer>
  );
};

export default Template;
