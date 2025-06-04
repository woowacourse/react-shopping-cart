import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { useContext } from 'react';
import { ToastContext, ToastProvider } from '@/shared/context/ToastProvider';

vi.useFakeTimers();

describe('ToastProvider', () => {
  let showToast: (msg: string, duration?: number) => void;

  const TestComponent = () => {
    const { showToast: show } = useContext(ToastContext);
    showToast = show;

    return <div>테스트 컴포넌트</div>;
  };

  beforeEach(() => {
    vi.clearAllTimers();
  });

  it('showToast 호출 시 Toast 메시지가 나타난다', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    act(() => {
      showToast('안녕하세요!');
    });

    expect(screen.getByText('안녕하세요!')).toBeInTheDocument();
  });

  it('duration 후 토스트가 사라진다', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    act(() => {
      showToast('지워질 토스트', 3000);
    });

    expect(screen.getByText('지워질 토스트')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.queryByText('지워질 토스트')).not.toBeInTheDocument();
  });

  it('기존 토스트가 있다면 clearTimeout 이후 새로 갱신된다', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    act(() => {
      showToast('첫 번째 토스트', 3000);
    });
    expect(screen.getByText('첫 번째 토스트')).toBeInTheDocument();

    act(() => {
      showToast('두 번째 토스트', 3000);
    });
    expect(screen.getByText('두 번째 토스트')).toBeInTheDocument();
  });
});
