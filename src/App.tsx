import Router from './routes/Router';
import { RecoilRoot } from 'recoil';

const App = () => {
  return (
    <RecoilRoot>
      <Router />
    </RecoilRoot>
  );
};

export default App;
