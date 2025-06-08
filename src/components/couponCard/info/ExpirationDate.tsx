type ExpirationDateProps = {
  expirationDate: string;
};

const ExpirationDate = ({ expirationDate }: ExpirationDateProps) => {
  const date = new Date(expirationDate);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const formattedDate = date.toLocaleDateString('ko-KR', options);

  return <p>{`만료일: ${formattedDate}`}</p>;
};

export default ExpirationDate;
