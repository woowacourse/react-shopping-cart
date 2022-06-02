import { useSnackbar } from '@/hooks/useSnackbar';
import { ROUTE } from '@/route';
import { leaveUserAsync } from '@/store/customer/action';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const useCustomerLeaveForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { triggerFailedSnackbar, triggerSucceededSnackbar } = useSnackbar();

  const [{ leaveReason, resignUpAgreement, pointRuleAgreement }, setLeaveState] = useState({
    leaveReason: '',
    resignUpAgreement: false,
    pointRuleAgreement: false,
  });

  const onChangeLeaveTextArea = e => {
    const {
      target: { value },
    } = e;

    setLeaveState(prev => ({ ...prev, leaveReason: value }));
  };

  const onClickAgreeCheckBox = key => {
    setLeaveState(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const onSubmitLeaveForm = e => {
    e.preventDefault();

    if (leaveReason.length === 0 || resignUpAgreement === false || pointRuleAgreement === false) {
      triggerFailedSnackbar('형식에 맞게 입력란을 작성해주세요.');
      return;
    }

    dispatch(
      leaveUserAsync({
        navigate: () => navigate(ROUTE.Home, { replace: true }),
        triggerFailedSnackbar,
        triggerSucceededSnackbar,
      }) as any,
    );
  };

  return {
    formState: {
      leaveReason,
      resignUpAgreement,
      pointRuleAgreement,
    },
    formHandler: {
      onChangeLeaveTextArea,
      onClickAgreeCheckBox,
      onSubmitLeaveForm,
    },
  };
};
