import Button from '@/components/common/Button/Button';
import PageTemplate from '@/components/common/PageTemplate/PageTemplate';
import * as Styled from './SignUp.style';
import Input from '@/components/common/Input/Input';
import { useState } from 'react';
function SignUp() {
  const [{ name, phoneNumber, address, password, passwordConfirm }, setState] = useState({
    name: '',
    phoneNumber: '',
    address: '',
    password: '',
    passwordConfirm: '',
  });

  const onChangeName = e => {
    const {
      target: { value },
    } = e;

    setState(prevState => ({
      ...prevState,
      name: value,
    }));
  };

  const onChangePhoneNumber = e => {
    const {
      target: { value },
    } = e;

    setState(prevState => ({
      ...prevState,
      phoneNumber: value,
    }));
  };

  const onChangeAddress = e => {
    const {
      target: { value },
    } = e;

    setState(prevState => ({
      ...prevState,
      address: value,
    }));
  };

  const onChangePassword = e => {
    const {
      target: { value },
    } = e;

    setState(prevState => ({
      ...prevState,
      password: value,
    }));
  };

  const onChangePasswordConfirm = e => {
    const {
      target: { value },
    } = e;

    setState(prevState => ({
      ...prevState,
      passwordConfirm: value,
    }));
  };

  return (
    <PageTemplate>
      <Styled.Container>
        <Styled.PageTitle>회원가입</Styled.PageTitle>
        <Styled.Form>
          <Input
            id="name"
            placeholder="유저 네임"
            value={name}
            onChange={onChangeName}
            description="영어와 숫자로 구성하여 3자이상 20자 이하로 입력해주세요 👻"
            labelText="유저 네임"
          />
          <Input
            id="phone-number"
            type="number"
            placeholder="숫자만 입력"
            value={phoneNumber}
            onChange={onChangePhoneNumber}
            description="숫자만 입력해주세요 (- 제외) 👻"
            labelText="핸드폰 번호"
          />
          <Input id="address" value={address} onChange={onChangeAddress} labelText="주소" />
          <Input
            id="password"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={onChangePassword}
            description="영어와 숫자를 포함하여 8자이상 20자 이하로 입력해주세요 👻"
            labelText="비밀번호"
          />
          <Input
            id="password-confirm"
            type="password"
            placeholder="비밀번호 확인"
            value={passwordConfirm}
            onChange={onChangePasswordConfirm}
            labelText="비밀번호 확인"
          />
          <Button padding="8px">확인</Button>
        </Styled.Form>
      </Styled.Container>
    </PageTemplate>
  );
}

export default SignUp;
