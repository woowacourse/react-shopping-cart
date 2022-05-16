import { useSelector } from 'react-redux';

import * as Styled from './styles';

const Snackbar = () => {
  const { visible, message } = useSelector((state) => state.snackbar);

  return visible && <Styled.Wrapper>{message}</Styled.Wrapper>;
};

export default Snackbar;
