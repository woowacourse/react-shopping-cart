import Button from '@/components/common/Button/Button';
import PageTemplate from '@/components/common/PageTemplate/PageTemplate';
import Input from '@/components/common/Input/Input';
import CustomerFormTemplate from '@/components/customer/CustomerFormTemplate/CustomerFormTemplate';
import { useCustomerForm } from '@/hooks/useCustomerForm';
import { ROUTE } from '@/route';
import { deleteCookie } from '@/api/cookie';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CustomerActionType } from '@/store/customer/action';
function Edit() {
  const dispatch = useDispatch();
  const {
    formValue: { phoneNumber, address },
    formHandler: { onChangeAddress, onChangePhoneNumber, onSubmitEditForm },
  } = useCustomerForm({
    usernameValue: '준찌',
    addressValue: '서울시 노원구',
    phoneNumberValue: '01027717502',
  });

  const onClickLogout = () => {
    deleteCookie('access-token');
    dispatch({ type: CustomerActionType.LOGOUT_USER });
  };

  return (
    <PageTemplate>
      <CustomerFormTemplate formTitle="정보수정" onSubmit={onSubmitEditForm}>
        <Input
          id="phone-number"
          placeholder="숫자만 입력"
          value={phoneNumber.value}
          onChange={onChangePhoneNumber}
          isError={phoneNumber.isError}
          description="휴대폰 번호 11자리를 입력해주세요 (- 제외)"
          labelText="핸드폰 번호"
        />

        <Input
          id="address"
          placeholder="시 단위 까지만 입력"
          value={address.value}
          onChange={onChangeAddress}
          labelText="주소"
        />

        <Button padding="8px">확인</Button>

        <p>
          <Link to={ROUTE.EditPassword}>비밀번호 변경</Link>
          <Link to={ROUTE.Leave}>회원 탈퇴</Link>
          <Link to={ROUTE.Home} onClick={onClickLogout}>
            로그아웃
          </Link>
        </p>
      </CustomerFormTemplate>
    </PageTemplate>
  );
}

export default Edit;
