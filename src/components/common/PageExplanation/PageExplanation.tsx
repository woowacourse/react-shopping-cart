import { ReactNode } from 'react';

import * as Styled from './PageExplanation.styled';

const Explanation = ({ children }: { children: ReactNode }) => {
  return <Styled.PageExplanation>{children}</Styled.PageExplanation>;
};

const Row = ({ children }: { children: ReactNode }) => {
  return <Styled.ExplanationRow>{children}</Styled.ExplanationRow>;
};

const PageExplanation = Object.assign(Explanation, {
  Row: Row,
});

export default PageExplanation;
