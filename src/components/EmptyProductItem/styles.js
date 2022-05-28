import styled from '@emotion/styled';
import * as CommonStyled from 'components/@common/CommonStyle/styles';

const Container = styled(CommonStyled.FlexWrapper)`
  align-items: center;
  flex-direction: column;
  padding: 2rem;

  & > img {
    width: 100%;
  }
`;

const Notice = styled.h2`
  font-size: 2rem;
  margin: 3rem 0;
`;

export { Container, Notice };
