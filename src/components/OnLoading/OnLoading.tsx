import { styled } from 'styled-components';
import { ReactComponent as Character } from '../../assets/img/baemin-charactor.svg';

const OnLoading = () => {
  return (
    <Wrapper>
      <Character />
      <h1>기달려 주소 ...</h1>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 32px;
`;

export default OnLoading;
