import ReactDom from 'react-dom';

const ModalPortal = ({ children }) => {
  const element = document.getElementById('modal') as HTMLElement;
  return ReactDom.createPortal(children, element);
};

export default ModalPortal;
