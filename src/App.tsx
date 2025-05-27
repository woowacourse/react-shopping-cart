import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import OrderPage from './page/OrderPage';
import ConfirmPage from './page/ConfirmPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OrderPage />} />
        <Route path="/confirm" element={<ConfirmPage />} />
      </Routes>
    </Router>
  );
}

export default App;
