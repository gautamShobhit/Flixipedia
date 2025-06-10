export const checkValidData = (email, password) => {
  const isEmaliValid = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(
    email
  );
  const isPasswordValid =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
      password
    );

  //email is not valid
  if (!isEmaliValid) return "E-mail ID is Invalid*";
  //password is not valid
  if (!isPasswordValid) return "Password is Invalid*";

  //if both are valid
  return null;
};
