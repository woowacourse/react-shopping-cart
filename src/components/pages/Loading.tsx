import styled from 'styled-components';

export default function Loading() {
  return <Wrapper>로딩 중... 잠시만 기다려주세요🙏</Wrapper>;
}

const Wrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 200px;

  font-size: 20px;
`;
