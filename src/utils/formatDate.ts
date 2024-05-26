export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return formattedDate;
};

export const formatHour = (timeString: string) => {
  const [hours] = timeString.split(':').map(Number);

  let formattedHour;

  if (hours < 12) {
    formattedHour = `오전 ${hours}시`;
  } else if (hours === 12) {
    formattedHour = `오후 12시`;
  } else {
    formattedHour = `오후 ${hours - 12}시`;
  }

  return formattedHour;
};
