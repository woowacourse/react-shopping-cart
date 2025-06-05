import { showErrorToast } from '@/shared/toast/toastStore';

export const handleCartActions = async <T>(
  action: () => Promise<T>,
  refetch?: () => void,
  onError?: () => void
) => {
  try {
    await action();
    refetch?.();
  } catch (e) {
    console.error('[Cart Error]', e);
    if (onError) {
      onError();
    } else {
      showErrorToast('요청을 처리하는 중 오류가 발생했습니다.');
    }
  }
};
