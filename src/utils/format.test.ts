import { dateFormat, timeFormat } from './format';

describe('format', () => {
  describe('dateFormat', () => {
    [
      {
        year: 2024,
        month: 12,
        date: 30,
      },
      {
        year: 2021,
        month: 2,
        date: 1,
      },
    ];
    it.each`
      year    | month | date
      ${2024} | ${12} | ${30}
      ${2021} | ${2}  | ${1}
    `(
      'Date객체를 인자로 넣었을 때, $year년 $month월 $date일 형태로 포맷된다.',
      ({ year, month, date }) => {
        const targetDate = new Date(`${year}-${month}-${date}`);
        const result = `${year}년 ${month}월 ${date}일`;

        expect(dateFormat(targetDate)).toBe(result);
      },
    );
  });

  describe('timeFormat', () => {
    it.each`
      time          | result
      ${'04:12:23'} | ${'오전 4시 12분 23초'}
      ${'12:24:56'} | ${'오후 12시 24분 56초'}
    `('$time을 result 형태로 포맷한다.', ({ time, result }) => {
      expect(timeFormat(time, true)).toBe(result);
    });

    it.each`
      time          | result
      ${'07:00:12'} | ${'오전 7시 12초'}
      ${'23:00:12'} | ${'오후 11시 12초'}
    `('00분 "분"은 제외한다.', ({ time, result }) => {
      expect(timeFormat(time, true)).toBe(result);
    });

    it.each`
      time          | result
      ${'07:12:00'} | ${'오전 7시 12분'}
      ${'23:12:00'} | ${'오후 11시 12분'}
    `('00초라면 "초"는 제외한다.', ({ time, result }) => {
      expect(timeFormat(time, true)).toBe(result);
    });
  });

  it.each`
    time          | result
    ${'07:00:00'} | ${'7시'}
  `('isPrefix가 "false"일 때, $time을 result 형태로 포맷한다.', ({ time, result }) => {
    expect(timeFormat(time, false)).toBe(result);
  });

  it.each`
    time          | result
    ${'07:00:00'} | ${'오전 7시'}
    ${'23:00:00'} | ${'오후 11시'}
  `(
    'isPrefix가 "true"일 때, $time앞에 "오전", "오후" prefix를 포함한 형태인 result 형태로 포맷한다.',
    ({ time, result }) => {
      expect(timeFormat(time, true)).toBe(result);
    },
  );

  it.each`
    time          | result
    ${'00:00:00'} | ${'오전 12시'}
  `('오전 00시는 "12시"로 표현한다.', ({ time, result }) => {
    expect(timeFormat(time, true)).toBe(result);
  });
});
