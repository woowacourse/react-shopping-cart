interface Props {
  error: Error;
}

const ErrorFallback = ({ error }: Props) => {
  return <div>error : {error.message}</div>;
};
export default ErrorFallback;
