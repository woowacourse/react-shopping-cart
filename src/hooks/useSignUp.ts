import { useState } from 'react';

const isValidNameInput = value => /^[0-9a-zA-Z]{3,20}$/.test(value) || value.length === 0;

const isValidPhoneNumberInput = value => /^[0-9]{11}$/.test(value) || value.length === 0;

const isValidPasswordInput = value =>
  /^(?=.*[0-9])(?=.*[a-zA-Z])[A-Za-z0-9]{8,20}$/.test(value) || value.length === 0;

export const useSignUp = () => {
  const [{ name, phoneNumber, address, password, passwordConfirm }, setState] = useState({
    name: { value: '', isError: false },
    phoneNumber: { value: '', isError: false },
    address: { value: '', isError: false },
    password: { value: '', isError: false },
    passwordConfirm: { value: '', isError: false },
  });

  const onChangeName = e => {
    const {
      target: { value },
    } = e;

    setState(prevState => ({
      ...prevState,
      name: {
        ...prevState.name,
        value,
        isError: !isValidNameInput(value),
      },
    }));
  };

  const onChangePhoneNumber = e => {
    const {
      target: { value },
    } = e;

    setState(prevState => ({
      ...prevState,
      phoneNumber: { ...prevState.phoneNumber, value, isError: !isValidPhoneNumberInput(value) },
    }));
  };

  const onChangeAddress = e => {
    const {
      target: { value },
    } = e;

    setState(prevState => ({
      ...prevState,
      address: { ...prevState.address, value },
    }));
  };

  const onChangePassword = e => {
    const {
      target: { value },
    } = e;

    setState(prevState => ({
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

    setState(prevState => ({
      ...prevState,
      passwordConfirm: {
        ...prevState.passwordConfirm,
        value,
        isError: !isValidPasswordInput(value) && value !== prevState.password,
      },
    }));
  };

  return {
    formValue: {
      name,
      phoneNumber,
      address,
      password,
      passwordConfirm,
    },
    formHandler: {
      onChangeName,
      onChangeAddress,
      onChangePhoneNumber,
      onChangePassword,
      onChangePasswordConfirm,
    },
  };
};
