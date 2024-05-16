interface ErrorFallbackProps {
  error: Error;
}

function OrderPageErrorFallback({ error }: ErrorFallbackProps) {
  return (
    <div>
      <div>
        <p>{error.message}</p>
      </div>
    </div>
  );
}

export default OrderPageErrorFallback;
