const isNumber = (inputValue: string) => {
  return /^[0-9]*$/.test(inputValue);
};

export { isNumber };
