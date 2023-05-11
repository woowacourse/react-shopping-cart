export const isNotNumber = (text: string) => {
  const onlyNumberExpression = /[^0-9]/g;

  return onlyNumberExpression.test(text);
};
