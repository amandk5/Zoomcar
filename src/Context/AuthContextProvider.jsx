import { useState } from "react";
import { createContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [isAuth, setAuthStatus] = useState(
    localStorage.getItem("isLoggedIn") || false
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [registered, setRegistrationStatus] = useState(false);
  const [location, setLocation] = useState("");

  const loginUser = (userCredential) => {
    // old - https://reqres.in/api/login
    axios
      .post("https://zoomcar-api-two.vercel.app/login", {
        email: userCredential.email,
        password: userCredential.password,
      })
      .then((res) => {
        alert("Logged In Successfully");
        setAuthStatus(true);
        setToken(res.data.token);
        // set token in local storage
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("token", res.data.token);
      })
      .catch((err) => {
        alert("invalid email or password");
        console.log(err);
      });
  };

  const registerUser = (userDetails) => {
    // old - https://reqres.in/api/register
    axios
      .post("https://zoomcar-api-two.vercel.app/register", {
        name: userDetails.name,
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
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
  };

  const changeLocation = (newLocation) => {
    setLocation(newLocation);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        token,
        loginUser,
        registered,
        registerUser,
        logOutUser,
        location,
        changeLocation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
