import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function UserAndCarLinks() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box mb="5">
      <Heading m="2">Admin Dashboard</Heading>
      <br />
      <Flex justifyContent={"space-around"}>
        <Button
          onClick={() => alert("work in progress, sorry for inconvenience")}
          color="black"
          bg="white"
          border={"2px solid black"}
          _hover={{ bg: "black", color: "white" }}
        >
          Add Cars
        </Button>

        {location.pathname.includes("/users") ? (
          <Button
            opacity={"0.9"}
            onClick={() => navigate("/admin/dashboard")}
            bg="#3B71CA"
            color="white"
            _hover={{ opacity: "1" }}
          >
            Display Cars
          </Button>
        ) : (
          <Button
            onClick={() => navigate("/admin/list/users")}
            bg="#3B71CA"
            color="white"
            _hover={{ opacity: "1" }}
          >
            Display Users
          </Button>
        )}
      </Flex>
    </Box>
  );
}
