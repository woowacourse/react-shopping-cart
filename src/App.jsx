import { useRoutes } from 'react-router-dom';
import routes from './Routes';
import './store/index';
import Header from './components/Header';

function App() {
  const content = useRoutes(routes);

  return (
    <div className="App">
      <Header />
      {content}
    </div>
  );
}

export default App;
