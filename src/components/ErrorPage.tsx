import { styled } from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: auto;
  justify-content: center;
  align-items: center;
  font-size: 56px;
  font-weight: 900;
  gap: 20px;
  color: red;
`;

const ErrorPage = () => {
  return (
    <Container>
      <div>에러</div>
      <img
        width="500px"
        height="500px"
        src={`${process.env.PUBLIC_URL}/images/error.png`}
        alt="error"
      />
    </Container>
  );
};
export default ErrorPage;
