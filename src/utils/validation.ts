export const isZeroValue = (inputValue: string) => {
  return +inputValue === 0;
};

export const handleInvalidQuantity = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  e.target.value = e.target.value.replaceAll(/[^0-9]+/g, '');
};
