import { FC } from 'react';
import TemplateContainer from './styles';

interface Props {
  children: React.ReactNode;
  backgroundColor?: string;
}

const Template: FC<Props> = ({ children, backgroundColor }) => {
  return <TemplateContainer backgroundColor={backgroundColor}>{children}</TemplateContainer>;
};

export default Template;
