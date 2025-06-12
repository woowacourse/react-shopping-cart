export const safeParseISODate = (str: string): Date | null => {
  const isoPattern =
    /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?)?$/;

  if (!isoPattern.test(str)) return null;

  const date = new Date(str);
  return Number.isNaN(date.getTime()) ? null : date;
};
