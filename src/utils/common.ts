export const isNotNumber = (text: string) => {
  const onlyNumberExpression = /[^0-9]/g;

  return onlyNumberExpression.test(text);
};

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
