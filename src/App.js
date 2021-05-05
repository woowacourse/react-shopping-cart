import { HashRouter as Router } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import NavBar from './components/NavBar/NavBar';

const App = () => (
  <>
    <GlobalStyles />
    <Router>
      <NavBar />
    </Router>
  </>
);

export default App;
