export const showInputErorrMessage = (
  isNotError: boolean,
  inputElement: HTMLInputElement,
  errorMessage: string
) => {
  if (isNotError) {
    inputElement.setCustomValidity('');
    return;
  }

  inputElement.setCustomValidity(errorMessage);

  inputElement.reportValidity();
};
