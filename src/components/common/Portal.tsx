import reactDom from 'react-dom';

const Portal = ({ children }: { children: React.ReactNode }) => {
  return reactDom.createPortal(children, document.getElementById('root-modal'));
};

export default Portal;
