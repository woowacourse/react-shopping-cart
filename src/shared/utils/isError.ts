export const isError = (error: unknown): error is Error => {
  return error instanceof Error;
};
