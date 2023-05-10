import { Outlet } from 'react-router-dom';
import Header from '../Header';
import { styled } from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
`; // 모듈화 필요 (Header에 이미 있는 파일)

function HomeLayout() {
  return (
    <>
      <Header></Header>
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default HomeLayout;
