export const isNotNumber = (text: string) => {
  const onlyNumberExpression = /[^0-9]/g;

  return onlyNumberExpression.test(text);
};

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
