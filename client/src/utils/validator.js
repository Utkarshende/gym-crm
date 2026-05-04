export const validateName = (name) =>
  /^[A-Za-z ]+$/.test(name);

export const validatePhone = (phone) =>
  /^\d{10}$/.test(phone);

export const validateEmail = (email) =>
  /\S+@\S+\.\S+/.test(email);