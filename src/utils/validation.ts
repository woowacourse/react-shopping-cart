export const validateNumberRange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const rule = /[^0-9]+/g;
  e.target.value = e.target.value.replaceAll(rule, "");
};
