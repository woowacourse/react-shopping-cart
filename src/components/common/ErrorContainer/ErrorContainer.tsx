import { EmptyObject } from 'redux';
import * as Styled from './ErrorContainer.style';

function ErrorContainer({ children }: React.PropsWithChildren<EmptyObject>) {
  return <Styled.Container>{children}</Styled.Container>;
}

export default ErrorContainer;
