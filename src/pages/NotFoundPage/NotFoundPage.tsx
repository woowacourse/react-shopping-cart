import styled from 'styled-components';

function NotFoundPage() {
  return (
    <StyledPage>
      <ErrorCode>404</ErrorCode>
      <br />
      NOT_FOUND_ERROR
      <img
        src="https://user-images.githubusercontent.com/57928612/169459010-97a04d43-48b9-4f96-83da-3229af21609a.png"
        alt="시무룩짱구"
        width="300px"
      />
    </StyledPage>
  );
}

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  height: 90vh;
  line-height: 30px;
  margin: auto;

  color: ${({ theme: { colors } }) => colors.red};

  font-size: 20px;
  font-weight: 900;
`;

const ErrorCode = styled.div`
  font-size: 30px;
`;

export default NotFoundPage;
