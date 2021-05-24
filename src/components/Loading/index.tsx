import { FC } from 'react';
import DefaultFallback from './DefaultFallback';

interface Props {
  children: React.ReactNode;
  isLoading: boolean;
  fallback?: React.ElementType;
}

const Loading: FC<Props> = ({ isLoading, children, fallback }) => {
  const Fallback: React.ElementType = fallback ?? DefaultFallback;

  return <>{isLoading ? <Fallback /> : children}</>;
};

export default Loading;
