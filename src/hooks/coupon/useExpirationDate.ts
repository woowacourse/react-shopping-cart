import dayjs from '@utils/dayjs';

const useExpirationDate = () => {
  const isExpired = (target: string, now: string) => {
    const targetTime = dayjs(target);
    const realTime = dayjs(now);

    return realTime.isAfter(targetTime);
  };

  return { isExpired };
};

export default useExpirationDate;
