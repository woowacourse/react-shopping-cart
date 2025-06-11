import { describe, it, expect, vi } from 'vitest';
import { isWithinTimeRange } from '../src/components/features/orderConfirm/utils/isWithInTimeRange';

describe('isWithinTimeRange', () => {
  it('현재 시간이 범위 내에 있으면 true를 반환한다', () => {
    vi.setSystemTime(new Date('2024-01-01T10:00:00'));
    expect(isWithinTimeRange('09:00:00', '18:00:00')).toBe(true);
  });

  it('현재 시간이 범위 밖이면 false를 반환한다', () => {
    vi.setSystemTime(new Date('2024-01-01T20:00:00'));
    expect(isWithinTimeRange('09:00:00', '18:00:00')).toBe(false);
  });

  it('start와 end가 같으면 항상 false를 반환한다', () => {
    vi.setSystemTime(new Date('2024-01-01T09:00:00'));
    expect(isWithinTimeRange('09:00:00', '09:00:00')).toBe(false);
  });
});
