import dayjs from '@utils/dayjs';

const useExpirationDate = () => {
  const isExpired = (dateString: string) => {
    const targetTime = dayjs(dateString);
    const now = dayjs();

    return now.isAfter(targetTime);
  };

  return { isExpired };
};

export default useExpirationDate;
