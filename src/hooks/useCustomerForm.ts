import { changePassword, editUser } from '@/api/customers';
import { ROUTE } from '@/route';
import { loginAsync, signUpAsync } from '@/store/customer/action';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const isValidNameInput = value => /^[0-9a-zA-Z]{3,20}$/.test(value);

const isValidPhoneNumberInput = value => /^[0-9]{11}$/.test(value);

const isValidPasswordInput = value => /^(?=.*[0-9])(?=.*[a-zA-Z])[A-Za-z0-9]{8,20}$/.test(value);

const validate = {
  username: value => !isValidNameInput(value),
  phoneNumber: value => !isValidPhoneNumberInput(value),
  password: value => !isValidPasswordInput(value),
  passwordConfirm: (value, password) => !isValidPasswordInput(value) && value !== password,
};

interface UserInformation {
  usernameValue?: string;
  addressValue?: string;
  phoneNumberValue?: string;
  passwordValue?: string;
  passwordConfirmValue?: string;
}

export const useCustomerForm = ({
  usernameValue = '',
  addressValue = '',
  phoneNumberValue = '',
  passwordValue = '',
  passwordConfirmValue = '',
}: UserInformation = {}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputData, setInputData] = useState({
    username: { value: usernameValue, isError: false },
    phoneNumber: { value: phoneNumberValue, isError: false },
    address: { value: addressValue, isError: false },
    password: { value: passwordValue, isError: false },
    passwordConfirm: { value: passwordConfirmValue, isError: false },
  });

  const { username, phoneNumber, address, password, passwordConfirm } = inputData;

  const onChangeUsername = e => {
    const {
      target: { value },
    } = e;

    setInputData(prevState => ({
      ...prevState,
      username: {
        ...prevState.username,
        value,
        isError: !isValidNameInput(value),
      },
    }));
  };

  const onChangePhoneNumber = e => {
    const {
      target: { value },
    } = e;

    setInputData(prevState => ({
      ...prevState,
      phoneNumber: { ...prevState.phoneNumber, value, isError: !isValidPhoneNumberInput(value) },
    }));
  };

  const onChangeAddress = e => {
    const {
      target: { value },
    } = e;

    setInputData(prevState => ({
      ...prevState,
      address: { ...prevState.address, value },
    }));
  };

  const onChangePassword = e => {
    const {
      target: { value },
    } = e;

    setInputData(prevState => ({
      ...prevState,
      password: {
        ...prevState.password,
        value,
        isError: !isValidPasswordInput(value),
      },
    }));
  };

  const onChangePasswordConfirm = e => {
    const {
      target: { value },
    } = e;

    setInputData(prevState => ({
      ...prevState,
      passwordConfirm: {
        ...prevState.passwordConfirm,
        value,
        isError: !isValidPasswordInput(value) && value !== prevState.password,
      },
    }));
  };

  const onSubmitSignUpForm = e => {
    e.preventDefault();

    if (Object.values(inputData).some(({ isError }) => isError)) {
      alert('에러 존재');

      // navigate => 로그인으로
      return;
    }
    dispatch(
      signUpAsync(
        {
          username: username.value,
          password: password.value,
          phoneNumber: phoneNumber.value,
          address: address.value,
        },
        () => navigate(ROUTE.Login, { replace: true }),
      ) as any,
    );
  };

  const onSubmitEditForm = async e => {
    e.preventDefault();

    await editUser({ phoneNumber: phoneNumber.value, address: address.value });
  };

  const onSubmitLoginForm = e => {
    e.preventDefault();

    dispatch(
      loginAsync({ username: username.value, password: password.value }, () =>
        navigate(ROUTE.Home, { replace: true }),
      ) as any,
    );
  };

  const onSubmitChangePasswordForm = async e => {
    e.preventDefault();

    await changePassword({ password: password.value });

    navigate(ROUTE.Edit, { replace: true });
  };

  return {
    formValue: {
      username,
      phoneNumber,
      address,
      password,
      passwordConfirm,
    },
    formHandler: {
      onChangeUsername,
      onChangeAddress,
      onChangePhoneNumber,
      onChangePassword,
      onChangePasswordConfirm,
      onSubmitSignUpForm,
      onSubmitEditForm,
      onSubmitLoginForm,
      onSubmitChangePasswordForm,
    },
  };
};
