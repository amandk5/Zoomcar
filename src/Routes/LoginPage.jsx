import { Container, Img, Text } from "@chakra-ui/react";
import React from "react";
import Login from "../Components/Login";

export default function LoginPage() {
  return (
    <Container centerContent>
      <Img
        src="https://www.zoomcar.com/build/fb65fcc43b8bededb813e093ea2d47d3.svg"
        w="70%"
        shadow="base"
      />
      <br />
      <Text fontSize="lg" fontWeight="bold">
        Enter Details To Login
      </Text>
      <Login />
    </Container>
  );
}
