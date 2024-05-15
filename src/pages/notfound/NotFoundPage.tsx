import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  // const handle = () => {
  //   navigate(PAGE_ROUTES.MAIN, { replace: true });
  // };

  return <div>NotFoundPage!</div>;
}
