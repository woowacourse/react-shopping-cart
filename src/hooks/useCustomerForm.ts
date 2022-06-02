import { changePassword, editUser } from '@/api/customers';
import { useSnackbar } from '@/hooks/useSnackbar';
import { ROUTE } from '@/route';
import { loginAsync, signUpAsync } from '@/store/customer/action';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const isValidNameInput = value => /^[0-9a-zA-Z]{3,20}$/.test(value);

const isValidPhoneNumberInput = value => /^[0-9]{11}$/.test(value);

const isValidPasswordInput = value => /^(?=.*[0-9])(?=.*[a-zA-Z])[A-Za-z0-9]{8,20}$/.test(value);

interface UserInformation {
  usernameValue?: string;
  addressValue?: string;
  phoneNumberValue?: string;
  passwordValue?: string;
  passwordConfirmValue?: string;
}

export const useCustomerForm = (userInformation: UserInformation = {}) => {
  const {
    usernameValue = '',
    addressValue = '',
    phoneNumberValue = '',
    passwordValue = '',
    passwordConfirmValue = '',
  } = userInformation;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { triggerFailedSnackbar, triggerSucceededSnackbar } = useSnackbar();

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
      triggerFailedSnackbar('양식을 지켜주세요 👻');
      return;
    }

    dispatch(
      signUpAsync({
        userInformation: {
          username: username.value,
          password: password.value,
          phoneNumber: phoneNumber.value,
          address: address.value,
        },
        navigate: () => navigate(ROUTE.Login, { replace: true }),
        triggerFailedSnackbar,
        triggerSucceededSnackbar,
      }) as any,
    );
  };

  const onSubmitEditForm = async e => {
    e.preventDefault();

    try {
      await editUser({ phoneNumber: phoneNumber.value, address: address.value });
      triggerSucceededSnackbar('정보수정에 성공하였습니다.');
    } catch ({
      response: {
        data: { error },
      },
    }) {
      triggerFailedSnackbar(error?.messages[0]);
    }
  };

  const onSubmitLoginForm = e => {
    e.preventDefault();

    dispatch(
      loginAsync({
        userInformation: { username: username.value, password: password.value },
        navigate: () => navigate(ROUTE.Home, { replace: true }),
        triggerFailedSnackbar,
        triggerSucceededSnackbar,
      }) as any,
    );
  };

  const onSubmitChangePasswordForm = async e => {
    e.preventDefault();

    try {
      await changePassword({ password: password.value });
      triggerSucceededSnackbar('비밀번호 변경에 성공하셨습니다.');
    } catch ({
      response: {
        data: { error },
      },
    }) {
      triggerFailedSnackbar(error);
    }

    navigate(ROUTE.Edit, { replace: true });
  };

  const initializeCustomerInformation = ({ phoneNumberValue = '', addressValue = '' }) => {
    setInputData(prev => ({
      ...prev,
      phoneNumber: { value: phoneNumberValue, isError: false },
      address: { value: addressValue, isError: false },
    }));
  };

  return {
    initializeCustomerInformation,
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
