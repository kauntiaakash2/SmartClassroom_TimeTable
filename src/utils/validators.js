export const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateRole = (role) => {
  const validRoles = ['admin', 'teacher', 'student'];
  return validRoles.includes(role.toLowerCase());
};