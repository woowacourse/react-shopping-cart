export const getUUID = () =>
  Number(
    crypto
      .randomUUID()
      .split('')
      .filter((id) => !isNaN(Number(id)))
      .join('')
  );
