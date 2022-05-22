import styled from 'styled-components';

import FlexBox from 'components/@shared/FlexBox/FlexBox.component';

import ServerErrorCharacter from 'assets/images/serverErrorCharacter.png';

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
      <img src={ServerErrorCharacter} alt="에러이미지" />
      <p>{children}</p>
    </ErrorContainer>
  );
}

export default Error;
