import { Line } from '../..';
import * as Styled from './style.js';

export const Header = (props) => {
  const { children, ...rest } = props;

  return (
    <Styled.Container {...rest}>
      <Styled.Title>{children}</Styled.Title>
      <Line color="#333333" />
    </Styled.Container>
  );
};
