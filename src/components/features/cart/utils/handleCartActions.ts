import { showErrorToast } from '@/services/toastStore';

export const handleCartActions = async <T>(
  action: () => Promise<T>,
  refetch?: () => Promise<void>,
  onError?: () => void
) => {
  try {
    await action();
    await refetch?.();
  } catch (e) {
    console.error('[Cart Error]', e);
    if (onError) {
      onError();
    } else {
      showErrorToast('요청을 처리하는 중 오류가 발생했습니다.');
    }
  }
};
