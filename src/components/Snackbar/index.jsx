import { useSelector } from 'react-redux';

import * as Styled from './styles';

const Snackbar = () => {
  const { visible, message } = useSelector((state) => state.snackbar);

  return visible && <Styled.Container>{message}</Styled.Container>;
};

export default Snackbar;
