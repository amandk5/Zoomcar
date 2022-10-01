import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { BsArrowLeftRight } from "react-icons/bs";
import { TbPlane } from "react-icons/tb";
import { GoPrimitiveDot } from "react-icons/go";
import findCarStyles from "./FindCars.module.css";
import { useState } from "react";
import SelectLocation from "./SelectLocation";
import { useNavigate } from "react-router-dom";

export default function FindCars({ changeBackground }) {
  const [isbtnclicked, setBtn] = useState(true);
  const [openModal,setModalStatus] = useState(false);

  const navigate = useNavigate();

  return (
    <>
    <Box marginBottom="70px">
      <Flex flexWrap="wrap">
        <Button
          fontWeight="light"
          bg="#F5F5F5"
          className={findCarStyles.flex}
          px="20"
          py="5"
          fontSize="15px"
          borderRightRadius="0rem"
          border={isbtnclicked ? "1px solid lightgreen" : null}
          onClick={() => {
            setBtn(true);
            changeBackground(1);
          }}
        >
          <p>
            <BsArrowLeftRight />
          </p>
          <p style={{ display: "block" }}>Round Trip</p>
        </Button>
        <Button
          fontWeight="light"
          bg="#F5F5F5"
          className={findCarStyles.flex}
          px="20"
          py="5"
          mb="3"
          fontSize="15px"
          borderLeftRadius="0rem"
          border={!isbtnclicked ? "1px solid lightgreen" : null}
          onClick={() => {
            setBtn(false);
            changeBackground(2);
          }}
        >
          <p>
            <TbPlane />
          </p>
          <p>Airport Round Trip</p>
        </Button>
      </Flex>
      <Flex
        w="100"
        bg="#F5F5F5"
        p="3"
        fontSize="15px"
        alignItems="center"
        gap="2"
        mb="3"
        borderRadius="0.5rem"
        cursor="pointer"
      >
        <Box bgGradient="linear(to-r, green.50, green.50)">
          <GoPrimitiveDot color="teal" />
        </Box>
        <Box opacity="0.5" onClick={()=>setModalStatus(true)}>Pick Up CIty, Airport, Address Or Hotel</Box>
      </Flex>
      <Button w="100%" p="3" bg="gainsboro" onClick={()=>navigate("/search")}>
        <Text opacity="0.5">FIND CARS</Text>
      </Button>
    </Box>
    <SelectLocation openModal={openModal} setModalStatus={setModalStatus}/>
    </>
  );
}
