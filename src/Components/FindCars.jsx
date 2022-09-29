import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { BsArrowLeftRight } from "react-icons/bs";
import { TbPlane } from "react-icons/tb";
import { GoPrimitiveDot } from "react-icons/go";
import findCarStyles from "./FindCars.module.css";
import { useState } from "react";
import SelectLocation from "./SelectLocation";

export default function FindCars({ changeBackground }) {
  const [isbtnclicked, setBtn] = useState(true);
  const [openModal,setModalStatus] = useState(false);

  return (
    <>
    <Box mb="30px">
      <Flex flexWrap="wrap">
        <Button
          fontWeight="light"
          bg="#F5F5F5"
          className={findCarStyles.flex}
          px="20"
          py="7"
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
          py="7"
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
      <br />
      <Flex
        w="100"
        bg="#F5F5F5"
        p="4"
        alignItems="center"
        gap="2"
        borderRadius="0.5rem"
        cursor="pointer"
      >
        <Box bgGradient="linear(to-r, green.50, green.50)">
          <GoPrimitiveDot color="teal" />
        </Box>
        <Box opacity="0.5" onClick={()=>setModalStatus(true)}>Pick Up CIty, Airport, Address Or Hotel</Box>
      </Flex>
      <br />
      <Button w="100%" p="7" bg="gainsboro">
        <Text opacity="0.5">FIND CARS</Text>
      </Button>
    </Box>
    <SelectLocation openModal={openModal} setModalStatus={setModalStatus}/>
    </>
  );
}
