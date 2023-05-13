import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>ERROR</h1>
      <p>예상치 못한 오류가 발생했어요🥲</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
