import Button from '@/components/common/Button/Button';
import CheckBox from '@/components/common/CheckBox/CheckBox';
import PageTemplate from '@/components/common/PageTemplate/PageTemplate';
import CustomerFormTemplate from '@/components/customer/CustomerFormTemplate/CustomerFormTemplate';
import * as Styled from './Leave.style';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '@/route';
import { useDispatch, useSelector } from 'react-redux';
import { leaveUserAsync } from '@/store/customer/action';
import Loading from '@/components/common/Loading/Loading';
import { withLogin } from '@/components/helper/withLogin';

function Leave() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state: any) => state.customer);

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
      alert('폼을 완성해주세요');
      return;
    }

    dispatch(leaveUserAsync(() => navigate(ROUTE.Home, { replace: true })) as any);
  };

  return (
    <PageTemplate>
      <CustomerFormTemplate formTitle="반성문" onSubmit={onSubmitLeaveForm}>
        <Styled.TextArea
          value={leaveReason}
          onChange={onChangeLeaveTextArea}
          placeholder="탈퇴하시는 이유가 뭔가요? (300자 내외로 작성해주세요)"
        />

        <Styled.AgreeCheckBox>
          <span>
            일주일 동안 재가입은 불가능합니다.<span>*</span>
          </span>
          <CheckBox
            isChecked={resignUpAgreement}
            onClick={() => onClickAgreeCheckBox('resignUpAgreement')}
          />
        </Styled.AgreeCheckBox>

        <Styled.AgreeCheckBox>
          <span>
            탈퇴 회원이 재가입하더라도 기존의 포인트는 이미 소멸되었기 때문에 양도되지 않습니다.
            <span>*</span>
          </span>
          <CheckBox
            isChecked={pointRuleAgreement}
            onClick={() => onClickAgreeCheckBox('pointRuleAgreement')}
          />
        </Styled.AgreeCheckBox>

        <Button padding="8px">탈퇴하기</Button>
      </CustomerFormTemplate>

      {isLoading && (
        <Loading type="page" fontSize="2rem">
          👻
        </Loading>
      )}
    </PageTemplate>
  );
}

export default withLogin(Leave, true);
