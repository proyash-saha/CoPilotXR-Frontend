const { v4: uuidv4 } = require("uuid");
const uuid = uuidv4();

export const createUser = (email, password) => {
  const newUser = {
    id: uuid,
    email: email,
    password: password,
  };

  try {
    let userDatabase = localStorage.getItem("userDatabase");

    if (!userDatabase) {
      // saving new user details to local storage when no users exist
      userDatabase = { users: [newUser] };
      localStorage.setItem("userDatabase", JSON.stringify(userDatabase));
    } else {
      let parsedData = JSON.parse(userDatabase);
      let existingUsers = parsedData.users;

      // checking for an existing user with the same email address
      for (const user of existingUsers) {
        if (user.email === email) {
          throw new Error("Email address already exists!");
        }
      }

      // appending and saving new user details to existing users list in local storage
      existingUsers.push(newUser);
      userDatabase = { users: existingUsers };
      localStorage.setItem("userDatabase", JSON.stringify(userDatabase));
    }
  } catch (error) {
    console.log(
      "user.database - createUser() - Error: Could not create a new user in database.",
      error
    );
    throw error;
  }
};

export const getAllUsers = () => {
  try {
    let userDatabase = localStorage.getItem("userDatabase");
    if (!userDatabase) {
      return [];
    }

    let parsedData = JSON.parse(userDatabase);
    let existingUsers = parsedData.users;
    return existingUsers;
  } catch (error) {
    console.log(
      "user.database - getAllUsers() - Error: Could not get all users from database.",
      error
    );
    throw error;
  }
};
