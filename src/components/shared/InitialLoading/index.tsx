import React, { FC, useEffect, useState } from 'react';
import Loading from '../../Loading';

interface Props {
  isLoading: boolean;
  children: React.ReactNode;
}

const LOADING_STATE = {
  INITIAL: 0,
  READY: 1,
  PENDING: 2,
  COMPLETE: 3,
};

const InitialLoading: FC<Props> = ({ isLoading, children }) => {
  const [InitialLoadingState, setInitialLoadingState] = useState(LOADING_STATE.INITIAL);

  useEffect(() => {
    if (InitialLoadingState !== LOADING_STATE.COMPLETE) {
      setInitialLoadingState((prevState) => prevState + 1);
    }
  }, [isLoading]);

  return <>{InitialLoadingState === LOADING_STATE.COMPLETE ? children : <Loading />}</>;
};

export default InitialLoading;
