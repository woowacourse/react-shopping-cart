export const formatTime = (time: string) => {
  const hours = time.split(":")[0];

  return `${hours}시`;
};
