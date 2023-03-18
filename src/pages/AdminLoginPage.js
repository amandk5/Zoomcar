import { Button, Container, Img, Input, Text } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import Login from "../Components/Login";
import { AuthContext } from "../Context/AuthContextProvider";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function AdminLoginPage() {
  const { isAuth, loginAdmin } = useContext(AuthContext);
  const LoggedInStatusLS = localStorage.getItem("isLoggedIn");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAdminLogin = (e) => {
    e.preventDefault();

    let creds = {
      email: email,
      password: password,
    };

    // login the admin via loginAdmin() function created inside authcontext
    loginAdmin(creds);
  };

  if (isAuth && LoggedInStatusLS) {
    return <Navigate to="/admin/dashboard" />;
  }

  return (
    <Container centerContent>
      <Img
        src="https://www.zoomcar.com/build/fb65fcc43b8bededb813e093ea2d47d3.svg"
        w="70%"
        shadow="base"
      />
      <br />
      <Text fontSize="lg" fontWeight="bold">
        Admin's Portal
      </Text>
      <Text fontSize="lg" fontWeight="bold" color="blue.500" mb="3">
        Login
      </Text>
      <form
        style={{ width: "70%", margin: "auto", marginBottom: "5px" }}
        onSubmit={handleAdminLogin}
      >
        <Input
          py="1"
          size="sm"
          placeholder="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          borderRadius="0.25rem"
        />
        <Input
          py="1"
          size="sm"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          borderRadius="0.25rem"
        />
        <Button
          size="sm"
          mt="2"
          _hover={{ background: "blue.500", color: "white" }}
          type="submit"
        >
          Login
        </Button>
      </form>
    </Container>
  );
}
