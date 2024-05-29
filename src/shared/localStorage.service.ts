interface IUser {
  email: string;
  role: string;
  _id: string;
}

const setUser = (user: IUser) => {
  sessionStorage.setItem("email", user.email);
  sessionStorage.setItem("role", user.role);
  sessionStorage.setItem("id", user._id);
};

const getUserId = () => {
  return sessionStorage.getItem("id");
};

const getUserRole = () => {
  return sessionStorage.getItem("role");
};

const getUserEmail = () => {
  return sessionStorage.getItem("email");
};

const removeUser = () => {
  sessionStorage.removeItem("email");
  sessionStorage.removeItem("role");
  sessionStorage.removeItem("id");
};

export const LocalStorageService = {
  setUser,
  getUserId,
  getUserRole,
  getUserEmail,
  removeUser,
};
