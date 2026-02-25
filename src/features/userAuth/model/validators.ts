export const validateUsername = (username: string) => {
  if (!username) {
    return "введите username";
  }

  if (username.length < 6) {
    return "username должен быть не менее 6 символов";
  }

  if (!/^[A-Za-z0-9_.]+$/.test(username)) {
    return "username должен содержать только латинские буквы, цифры, точки и символы: ._";
  }

  return null;
};

export const validatePassword = (password: string) => {
  if (!password) {
    return "введите пароль";
  }

  if (password.length < 6) {
    return "пароль должен быть не менее 6 символов";
  }

  if (!/^[A-Za-z0-9_.!@]+$/.test(password)) {
    return "пароль должен содержать только латинские буквы, цифры, точки и символы: ._!@";
  }

  return null;
};
