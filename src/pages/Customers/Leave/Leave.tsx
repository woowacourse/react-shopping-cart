import Button from '@/components/common/Button/Button';
import CheckBox from '@/components/common/CheckBox/CheckBox';
import PageTemplate from '@/components/common/PageTemplate/PageTemplate';
import CustomerFormTemplate from '@/components/customer/CustomerFormTemplate/CustomerFormTemplate';
import * as Styled from './Leave.style';
import { useSelector } from 'react-redux';
import Loading from '@/components/common/Loading/Loading';
import { withLogin } from '@/components/helper/withLogin';
import { useCustomerLeaveForm } from '@/hooks/useCustomerLeaveForm';

function Leave() {
  const { isLoading } = useSelector((state: any) => state.customer);

  const {
    formState: { leaveReason, resignUpAgreement, pointRuleAgreement },
    formHandler: { onChangeLeaveTextArea, onClickAgreeCheckBox, onSubmitLeaveForm },
  } = useCustomerLeaveForm();

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
