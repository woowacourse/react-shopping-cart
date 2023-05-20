import { styled } from 'styled-components';
import Router from './Route';
import Header from './components/Header';
import GlobalStyle from './styles/GlobalStyle';
import ResetStyle from './styles/ResetStyle';

const Content = styled.main`
  margin: 0 auto;
  margin-top: 60px;
  padding: 0 24px;

  max-width: 1300px;
`;

const App = () => {
  return (
    <>
      <ResetStyle />
      <GlobalStyle />

      <Header />

      <Content>
        <Router />
      </Content>
    </>
  );
};

export default App;
