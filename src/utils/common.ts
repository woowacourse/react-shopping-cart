export const showInputErrorMessage = (
  isError: boolean,
  inputElement: HTMLInputElement,
  errorMessage: string
) => {
  if (!isError) {
    inputElement.setCustomValidity('');
    return;
  }

  inputElement.setCustomValidity(errorMessage);

  inputElement.reportValidity();
};

export const formatPrice = (price: number) => {
  return price.toLocaleString('ko-KR');
};
