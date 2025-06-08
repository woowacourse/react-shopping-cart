type AvailableTimeProps = {
  availableTime: {
    start: string;
    end: string;
  };
};

const AvailableTime = ({
  availableTime: { start, end },
}: AvailableTimeProps) => {
  const fmt = (t: string) =>
    new Intl.DateTimeFormat('ko-KR', {
      hour: 'numeric',
      hour12: true,
    }).format(new Date(`1970-01-01T${t}`));

  return (
    <p>
      사용 가능 시간: {fmt(start)}부터 {fmt(end)}까지
    </p>
  );
};

export default AvailableTime;
