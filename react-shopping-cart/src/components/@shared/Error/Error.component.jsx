import styled from 'styled-components';
import ServerErrorCharacter from 'assets/images/serverErrorCharacter.png';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;

  img {
    width: 300px;
    height: 300px;
  }
  p {
    font-size: 20px;
  }
`;

function Error({ children }) {
  return (
    <ErrorContainer>
      <img src={ServerErrorCharacter} />
      <p>{children}</p>
    </ErrorContainer>
  );
}

export default Error;
