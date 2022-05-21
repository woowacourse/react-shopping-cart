import { useState } from 'react';
import apiClient from 'utils/apiClient';
// import { useDispatch } from 'react-redux';
// import { getCartListAsync } from 'reducers/cartList/cartList.thunks';

const usePost = (url, payload) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [result, setResult] = useState(null);
  // const dispatch = useDispatch();

  const callPostApi = () => {
    setIsLoading(true);

    apiClient
      .post(url, payload)
      .then((response) => {
        setIsLoading(false);
        setResult(response.data);
        // dispatch(getCartListAsync); // api에서 리덕스로 cart 상태 가져오기
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        setIsError(true);
      });
  };

  return { isLoading, isError, result, callPostApi };
};

export default usePost;
