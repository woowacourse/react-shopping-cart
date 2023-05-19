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

export const fetchAPI = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`API 요청에 실패했습니다. status : ${response.status}`);
  }

  const data: T = await response.json();
  return data;
};
