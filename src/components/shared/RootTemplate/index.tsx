import { FC } from 'react';
import { TemplateContainer, InnerTemplateContainer, InnerTemplateTitle } from './styles';

interface Props {
  children: React.ReactNode;
  backgroundColor?: string;
  title?: string;
}

const RootTemplate: FC<Props> = ({ children, backgroundColor, title }) => {
  return (
    <TemplateContainer backgroundColor={backgroundColor}>
      <InnerTemplateContainer>
        {title && <InnerTemplateTitle>{title}</InnerTemplateTitle>}
        <div>{children}</div>
      </InnerTemplateContainer>
    </TemplateContainer>
  );
};

export default RootTemplate;
