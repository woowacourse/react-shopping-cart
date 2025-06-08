import { describe, it, expect } from 'vitest';
import { formatDate, formatAMPM, formatTimeRange } from '../../src/utils/dateTimeFormatter';

describe('dateTimeFormatter 테스트', () => {
  describe('formatDate', () => {
    it('날짜 문자열을 한국어 형식으로 변환한다', () => {
      expect(formatDate('2025-07-31')).toBe('2025년 7월 31일');
      expect(formatDate('2024-01-01')).toBe('2024년 1월 1일');
      expect(formatDate('2023-12-25')).toBe('2023년 12월 25일');
    });

    it('앞에 0이 붙은 월일을 올바르게 변환한다', () => {
      expect(formatDate('2025-01-05')).toBe('2025년 1월 5일');
      expect(formatDate('2025-10-09')).toBe('2025년 10월 9일');
      expect(formatDate('2025-06-19')).toBe('2025년 6월 19일');
    });
  });

  describe('formatAMPM', () => {
    it('12시 이전은 오전으로 표시한다', () => {
      expect(formatAMPM(0)).toBe('오전');
      expect(formatAMPM(6)).toBe('오전');
      expect(formatAMPM(11)).toBe('오전');
    });

    it('12시 이후는 오후로 표시한다', () => {
      expect(formatAMPM(12)).toBe('오후');
      expect(formatAMPM(15)).toBe('오후');
      expect(formatAMPM(23)).toBe('오후');
    });
  });

  describe('formatTimeRange', () => {
    it('같은 오전 시간대의 범위를 올바르게 표시한다', () => {
      expect(formatTimeRange('04:00:00', '07:00:00')).toBe('오전 4시부터 7시까지');
      expect(formatTimeRange('09:00:00', '11:00:00')).toBe('오전 9시부터 11시까지');
    });

    it('같은 오후 시간대의 범위를 올바르게 표시한다', () => {
      expect(formatTimeRange('13:00:00', '18:00:00')).toBe('오후 1시부터 6시까지');
      expect(formatTimeRange('20:00:00', '23:00:00')).toBe('오후 8시부터 11시까지');
    });

    it('오전에서 오후로 넘어가는 시간 범위를 올바르게 표시한다', () => {
      expect(formatTimeRange('10:00:00', '14:00:00')).toBe('오전 10시부터 오후 2시까지');
      expect(formatTimeRange('11:00:00', '13:00:00')).toBe('오전 11시부터 오후 1시까지');
    });

    it('자정(0시)을 12시로 올바르게 표시한다', () => {
      expect(formatTimeRange('00:00:00', '03:00:00')).toBe('오전 12시부터 3시까지');
      expect(formatTimeRange('22:00:00', '00:00:00')).toBe('오후 10시부터 오전 12시까지');
    });

    it('정오(12시)를 올바르게 표시한다', () => {
      expect(formatTimeRange('12:00:00', '15:00:00')).toBe('오후 12시부터 3시까지');
      expect(formatTimeRange('10:00:00', '12:00:00')).toBe('오전 10시부터 오후 12시까지');
    });
  });
});
