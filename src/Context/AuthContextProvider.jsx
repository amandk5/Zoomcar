import { useState } from "react";
import { createContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [isAuth, setAuthStatus] = useState(false);
  const [token, setToken] = useState(null);
  const [registered, setRegistrationStatus] = useState(false);

  const loginUser = (userCredential) => {
    axios
      .post("https://reqres.in/api/login", {
        email: userCredential.email,
        password: userCredential.password,
      })
      .then((res) => {
        alert("Logged In Successfully");
        setAuthStatus(true);
        setToken(res.data.token);
      })
      .catch((err) => {
        alert("invalid email or password");
        console.log(err);
      });
  };

  const registerUser = (userDetails) => {
    axios
      .post("https://reqres.in/api/register", {
        email: userDetails.email,
        password: userDetails.password,
      })
      .then(() => {
        alert("registration successful");
        setTimeout(() => {
          setRegistrationStatus(true);
        }, 2000);
        setTimeout(() => {
          setRegistrationStatus(false);
        }, 3000);
      })
      .catch((err) => {
        alert("registration failed");
        console.log(err);
      });
  };

  const logOutUser = () => {
    setAuthStatus(false);
    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{ isAuth, token, loginUser, registered, registerUser, logOutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
