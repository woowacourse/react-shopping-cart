interface Props {
  error: Error;
}

const ErrorFallback = ({ error }: Props) => {
  return (
    <div style={{ backgroundColor: 'red', zIndex: '100' }}>
      error : {error.message}
    </div>
  );
};
export default ErrorFallback;
