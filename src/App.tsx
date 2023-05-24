import { RecoilRoot } from 'recoil';
import { Header } from './components/Header';
import { Router } from './router/Router';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <RecoilRoot>
          <Header />
          <Router />
        </RecoilRoot>
      </BrowserRouter>
    </div>
  );
}

export default App;
