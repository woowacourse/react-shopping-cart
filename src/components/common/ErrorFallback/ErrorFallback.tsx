interface ErrorFallbackProps {
  error: Error;
}

function ErrorFallback({ error }: ErrorFallbackProps) {
  return (
    <div>
      <div>
        <p>오류 메세지:{error.message}</p>
      </div>
    </div>
  );
}

export default ErrorFallback;
