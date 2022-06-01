import Button from '@/components/common/Button/Button';
import PageTemplate from '@/components/common/PageTemplate/PageTemplate';
import Input from '@/components/common/Input/Input';
import CustomerFormTemplate from '@/components/customer/CustomerFormTemplate/CustomerFormTemplate';
import { useCustomerForm } from '@/hooks/useCustomerForm';

function EditPassword() {
  const {
    formValue: { password, passwordConfirm },
    formHandler: { onChangePassword, onChangePasswordConfirm, onSubmitChangePasswordForm },
  } = useCustomerForm();

  return (
    <PageTemplate>
      <CustomerFormTemplate formTitle="비밀번호 변경" onSubmit={onSubmitChangePasswordForm}>
        <Input
          id="password"
          type="password"
          placeholder="비밀번호"
          value={password.value}
          onChange={onChangePassword}
          isError={password.isError}
          description="영어와 숫자를 포함하여 8자이상 20자 이하로 입력해주세요"
          labelText="비밀번호"
        />
        <Input
          id="password-confirm"
          type="password"
          placeholder="비밀번호 확인"
          value={passwordConfirm.value}
          onChange={onChangePasswordConfirm}
          isError={passwordConfirm.isError}
          labelText="비밀번호 확인"
        />
        <Button padding="8px">확인</Button>
      </CustomerFormTemplate>
    </PageTemplate>
  );
}

export default EditPassword;
