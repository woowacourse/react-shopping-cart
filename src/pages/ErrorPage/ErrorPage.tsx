import { useLocation } from 'react-router-dom';

const ErrorPage = () => {
  const { state } = useLocation();

  return (
    <div>
      <h1>ErrorPage</h1>
      <p>{state.error.message}</p>
    </div>
  );
};

export default ErrorPage;
