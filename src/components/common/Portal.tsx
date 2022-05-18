import reactDom from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
  id: string;
}

const Portal = ({ children, id }: PortalProps) => {
  return reactDom.createPortal(children, document.getElementById(id));
};

export default Portal;
