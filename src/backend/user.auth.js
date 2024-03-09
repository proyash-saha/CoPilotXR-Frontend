import { createUser } from "../backend/user.database";
import { getAllUsers } from "../backend/user.database";

export const registerUser = (email, password) => {
  try {
    createUser(email, password);
  } catch (error) {
    console.log(
      "user.auth - registerUser() - Error: Could not register user.",
      error
    );
    throw error;
  }
};

export const isExistingUser = (email, password) => {
  try {
    const existingUsers = getAllUsers();
    const user = existingUsers.filter(
      (user) => user.email === email && user.password === password
    )[0];

    if (user) {
      return true;
    }
    return false;
  } catch (error) {
    console.log("user.auth - logIn() - Error: Could not log in user.", error);
    throw error;
  }
};
