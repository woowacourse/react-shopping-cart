import Button from '@/components/common/Button/Button';
import PageTemplate from '@/components/common/PageTemplate/PageTemplate';
import Input from '@/components/common/Input/Input';
import { useCustomerForm } from '@/hooks/useCustomerForm';
import { Link } from 'react-router-dom';
import { ROUTE } from '@/route';
import CustomerFormTemplate from '@/components/customer/CustomerFormTemplate/CustomerFormTemplate';
import { useSelector } from 'react-redux';
import Loading from '@/components/common/Loading/Loading';
import { withLogin } from '@/components/helper/withLogin';
function Login() {
  const { isLoading } = useSelector((state: any) => state.customer);
  const {
    formValue: { username, password },
    formHandler: { onChangeUsername, onChangePassword, onSubmitLoginForm },
  } = useCustomerForm();

  return (
    <PageTemplate>
      <CustomerFormTemplate formTitle="로그인" onSubmit={onSubmitLoginForm}>
        <Input
          id="name"
          placeholder="유저 네임"
          value={username.value}
          onChange={onChangeUsername}
          labelText="유저 네임"
        />
        <Input
          id="password"
          type="password"
          placeholder="비밀번호"
          value={password.value}
          onChange={onChangePassword}
          labelText="비밀번호"
        />

        <Button padding="8px">확인</Button>
        <p>
          <span>아직 회원이 아니신가요?</span>
          <Link to={ROUTE.SignUp}>회원가입 하기</Link>
        </p>
      </CustomerFormTemplate>

      {isLoading && (
        <Loading type="page" fontSize="2rem">
          👻
        </Loading>
      )}
    </PageTemplate>
  );
}

export default withLogin(Login, false);
