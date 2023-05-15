export const validateNumberRange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.value === '0') {
    e.target.value = '1';
  }
};

export const isZeroValue = (inputValue: string) => {
  return +inputValue === 0;
};

export const handleInvalidQuantity = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  e.target.value = e.target.value.replaceAll(/[^0-9]+/g, '');
};

export const fillBlankInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target.value) {
    e.target.value = '1';
  }
};
