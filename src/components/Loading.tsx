import { styled } from "styled-components";

export const Loading = ({ message }: { message?: string }) => {
  return (
    <Wrapper>
      <p>{message}</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 30%;
  height: 100%;
  padding: 200px 0;

  align-items: center;
  text-align: center;
  line-height: 24px;

  & > h2 {
    font-size: 50px;
    font-weight: 700;
    margin-bottom: 30px;
  }
`;
