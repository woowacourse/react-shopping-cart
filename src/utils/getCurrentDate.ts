let mockedDate: Date | null = null;

export const getCurrentDate = () => {
  return mockedDate ?? new Date();
};

export const setMockDate = (date: Date) => {
  mockedDate = date;
};

export const resetMockDate = () => {
  mockedDate = null;
};
