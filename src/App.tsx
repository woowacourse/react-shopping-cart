import * as S from './App.styled';
import Footer from './widgets/footer/ui/Footer';
import Navbar from './widgets/navbar/ui/Navbar';

function App() {
  return (
    <S.AppContainer>
      <Navbar />
      <S.AppContent>여기는 메인</S.AppContent>
      <Footer />
    </S.AppContainer>
  );
}

export default App;
