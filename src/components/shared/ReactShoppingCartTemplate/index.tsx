import { FC } from 'react';
import { TemplateContainer, InnerTemplateContainer, Title } from './styles';

interface Props {
  children: React.ReactNode;
  backgroundColor?: string;
  title?: string;
}

const ReactShoppingCartTemplate: FC<Props> = ({ children, backgroundColor, title }) => {
  return (
    <TemplateContainer backgroundColor={backgroundColor}>
      <InnerTemplateContainer>
        {title && <Title>{title}</Title>}
        <div>{children}</div>
      </InnerTemplateContainer>
    </TemplateContainer>
  );
};

export default ReactShoppingCartTemplate;
