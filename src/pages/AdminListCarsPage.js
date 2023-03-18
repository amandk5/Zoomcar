import {
  background,
  Box,
  Button,
  color,
  Image,
  Table,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCars } from "../redux/admin/admin.action";

export default function AdminListCarsPage() {
  const { cars } = useSelector((store) => store.admin);
  const dispatch = useDispatch();

  const [hovered, setHovered] = useState({
    id: "",
    status: false,
  });

  useEffect(() => {
    if (cars.length === 0) {
      dispatch(getAllCars());
    }
  }, []);

  return (
    <div>
      {cars.length === 0 ? (
        "No Cars to Display, Add Cars"
      ) : (
        <>
          <Text fontSize={"17px"} textUnderlineOffset={"5px"} fontWeight="bold">
            <u>Car Details</u>
          </Text>
          <br />
          <Box margin={"auto"} overflowX="scroll" width={"95%"}>
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
                  <th>Image</th>
                  <th>Km</th>
                  <th>Seats</th>
                  <th>Fuel</th>
                  <th>Transmission</th>
                  <th>Address</th>
                  <th>Offer Price</th>
                  <th>Original Price</th>
                  <th>Ratings</th>
                </tr>
              </thead>
              <tbody>
                {cars.map((c, index) => (
                  <Tr
                    cursor={"pointer"}
                    key={c._id}
                    _hover={{
                      boxShadow:
                        " rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px ",
                    }}
                  >
                    <td>{index + 1}</td>
                    <td>{c.name}</td>
                    <td>
                      <Image src={c.image} width="100px" alt={c.name} />
                    </td>
                    <td>{c.kms.split(" ")[0]}</td>
                    <td>{c.seats}</td>
                    <td>{c.fuel}</td>
                    <td>{c.transmission}</td>
                    <td>{c.address}</td>
                    <td>{c.discount_price}</td>
                    <td>{c.original_price}</td>
                    <td>{c.ratings}</td>
                    {/* {hovered.id === c._id && hovered.status === true ? ( */}
                    {/* // ) : null} */}
                    <td>
                      <Button
                        opacity={"0.8"}
                        m="3"
                        fontSize={"xs"}
                        bg="teal"
                        color={"white"}
                        _hover={{ opacity: "1" }}
                        onClick={() => alert("not allowed")}
                      >
                        Edit
                      </Button>
                    </td>
                    <td>
                      <Button
                        opacity={"0.8"}
                        m="3"
                        fontSize={"xs"}
                        bg="#d9534f"
                        color={"white"}
                        _hover={{ opacity: "1" }}
                        onClick={() => alert("not allowed")}
                      >
                        Remove
                      </Button>
                    </td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          </Box>
        </>
      )}
    </div>
  );
}
