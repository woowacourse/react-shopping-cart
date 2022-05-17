import styled from 'styled-components';
import ServerErrorCharacter from 'assets/images/serverErrorCharacter.png';
import FlexBox from 'components/@shared/FlexBox/FlexBox.component';

const ErrorContainer = styled(FlexBox)`
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
    <ErrorContainer direction="column" alignItems="center" gap="30px">
      <img src={ServerErrorCharacter} />
      <p>{children}</p>
    </ErrorContainer>
  );
}

export default Error;
