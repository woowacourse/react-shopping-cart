import Button from '@/components/common/Button/Button';
import PageTemplate from '@/components/common/PageTemplate/PageTemplate';
import * as Styled from './SignUp.style';
import Input from '@/components/common/Input/Input';
import { useSignUp } from '@/hooks/useSignUp';
function SignUp() {
  const {
    formValue: { name, phoneNumber, address, password, passwordConfirm },
    formHandler: {
      onChangeName,
      onChangeAddress,
      onChangePhoneNumber,
      onChangePassword,
      onChangePasswordConfirm,
    },
  } = useSignUp();

  return (
    <PageTemplate>
      <Styled.Container>
        <Styled.PageTitle>회원가입</Styled.PageTitle>
        <Styled.Form>
          <Input
            id="name"
            placeholder="유저 네임"
            value={name.value}
            onChange={onChangeName}
            isError={name.isError}
            description="영어와 숫자로 구성하여 3자이상 20자 이하로 입력해주세요"
            labelText="유저 네임"
          />
          <Input
            id="phone-number"
            placeholder="숫자만 입력"
            value={phoneNumber.value}
            onChange={onChangePhoneNumber}
            isError={phoneNumber.isError}
            description="휴대폰 번호 11자리를 입력해주세요 (- 제외)"
            labelText="핸드폰 번호"
          />
          <Input id="address" value={address.value} onChange={onChangeAddress} labelText="주소" />
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
        </Styled.Form>
      </Styled.Container>
    </PageTemplate>
  );
}

export default SignUp;
