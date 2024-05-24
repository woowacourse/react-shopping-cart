import React, { ReactNode } from 'react';
import * as S from './Text.style';

export type TextProps = {
  size?: 's' | 'm' | 'l' | number;
  weight?: 's' | 'm' | 'l';
  children: ReactNode;
};

const Text = ({ children, size = 'm', weight = 'l' }: TextProps) => {
  const makeNewLine = (text: ReactNode) => {
    if (typeof text === 'string') {
      return text.split('\n').map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ));
    }
    return text;
  };

  return (
    <S.Text size={size} weight={weight}>
      {makeNewLine(children)}
    </S.Text>
  );
};

export default Text;
