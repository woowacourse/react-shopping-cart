import { useNavigate } from 'react-router-dom';

import Error from '../../components/common/Error/Error';
import { HTTP_ERROR_MESSAGE, HTTP_STATUS_CODE } from '../../constants/api';
import { PATH } from '../../constants/path';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const httpStatusCode = HTTP_STATUS_CODE.NOT_FOUND;
  const errorMessage = HTTP_ERROR_MESSAGE[httpStatusCode].HEADING;

  return (
    <Error
      message={errorMessage}
      statusCode={httpStatusCode}
      resetError={() => navigate(PATH.ROOT)}
    />
  );
};

export default NotFoundPage;
