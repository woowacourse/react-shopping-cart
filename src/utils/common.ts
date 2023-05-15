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
