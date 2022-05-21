import { useSelector } from 'react-redux';

import * as Styled from './styles';

const Snackbar = ({ testMode = false }) => {
  const { visible, message } = useSelector((state) => state.snackbar);

  if (testMode) {
    return <Styled.Wrapper>테스트 스낵바 메시지입니다 😊</Styled.Wrapper>;
  }

  return visible && <Styled.Wrapper>{message}</Styled.Wrapper>;
};

export default Snackbar;
