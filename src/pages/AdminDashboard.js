import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import Navbar from "../Components/Navbar";
import "../App.css";
import AdminListCarsPage from "./AdminListCarsPage";
import UserAndCarLinks from "../Components/UserAndCarLinks";

export default function AdminDashboard() {
  return (
    <Box textAlign={"center"}>
      <Navbar />
      <br />
      <UserAndCarLinks />
      {/* Display cars list  */}
      <AdminListCarsPage />
    </Box>
  );
}
