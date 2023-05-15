export const validateNumberRange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const rule = /[^0-9]+/g;
  e.target.value = e.target.value.replaceAll(rule, "");

  if (e.target.value === "0") {
    e.target.value = "1";
  }
};

export const fillBlankInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target.value) {
    e.target.value = "1";
  }
};
