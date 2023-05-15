const safeJsonParse = <T>(data: string): T | null => {
  try {
    return JSON.parse(data) as T;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default safeJsonParse;
