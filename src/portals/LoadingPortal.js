import ReactDOM from 'react-dom';

const LoadingPortal = ({ children }) => {
  return ReactDOM.createPortal(children, document.getElementById('loading'));
};

export default LoadingPortal;
