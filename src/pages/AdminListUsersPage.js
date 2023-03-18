import { Box, Table, Text, Tr } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Components/Navbar";
import UserAndCarLinks from "../Components/UserAndCarLinks";
import { getAllUsers } from "../redux/admin/admin.action";

export default function AdminListUsersPage() {
  const { users } = useSelector((store) => store.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    if (users.length === 0) {
      dispatch(getAllUsers());
    }
  }, []);

  return (
    <>
      <Navbar />
      <br />
      <UserAndCarLinks />
      {users.length === 0 ? (
        "No User to Display"
      ) : (
        <>
          <Text fontSize={"17px"} textUnderlineOffset={"5px"} fontWeight="bold">
            <u>User Details</u>
          </Text>
          <br />
          <Box margin={"auto"} width={"95%"}>
            <Table
              overflowY="scroll"
              width={"100%"}
              fontSize={"xs"}
              cellPadding={"5px"}
            >
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, index) => (
                  <Tr
                    key={u._id}
                    _hover={{
                      boxShadow:
                        " rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px ",
                    }}
                  >
                    <td>{index + 1}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          </Box>
        </>
      )}
    </>
  );
}
