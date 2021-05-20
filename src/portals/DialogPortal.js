import ReactDOM from 'react-dom';

const DialogPortal = ({ children }) => {
  return ReactDOM.createPortal(children, document.getElementById('dialog'));
};

export default DialogPortal;
