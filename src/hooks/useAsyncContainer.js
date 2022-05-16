function useAsyncContainer({ isLoading, isError, isContentLoaded = true }) {
  return ({ loadingFallback, errorFallback, children }) => (
    <>
      {(isLoading && loadingFallback) ||
        (isError && errorFallback) ||
        (isContentLoaded && children)}
    </>
  );
}

export default useAsyncContainer;
