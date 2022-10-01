import { Box, Button, Flex, Img, Text } from "@chakra-ui/react";
import React from "react";
import { GoPrimitiveDot } from "react-icons/go";
import { BsArrowRight } from "react-icons/bs";
import SortAndFilters from "../Components/SortAndFilters";
import CarCard from "../Components/CarCard";

import carData from "../Db/db.json";
import Navbar from "../Components/Navbar";

export default function ResultsPage() {
  return (
    <>
      <Navbar />
      <Flex justifyContent="center" gap="4" py="3" flexWrap="wrap" bg="#f5f5f5">
        <SortAndFilters />
        {/* car list  */}
        <Box w="68%">
          {/* top section */}
          <Flex justifyContent="space-between">
            <Flex
              bg="white"
              w="49%"
              p="1"
              alignItems="center"
              gap="2"
              fontSize="13px"
              borderRadius="0.25rem"
              cursor="pointer"
            >
              <Box bgGradient="linear(to-r, green.50, green.50)">
                <GoPrimitiveDot color="teal" />
              </Box>
              <Box>Pick Up CIty, Airport, Address Or Hotel</Box>
            </Flex>
            <Flex
              bg="white"
              w="49%"
              p="1"
              alignItems="center"
              justifyContent="space-evenly"
              gap="2"
              borderRadius="0.25rem"
              cursor="pointer"
            >
              <Box textAlign="left">
                <Text fontSize="10px">START DATE/TIME</Text>
                <Text fontSize="13px" fontWeight="bold">
                  1 Oct, 2022 02:00 PM{" "}
                </Text>
              </Box>
              <Box>
                <BsArrowRight />
              </Box>
              <Box textAlign="right">
                <Text fontSize="10px">END DATE/TIME</Text>
                <Text fontSize="13px" fontWeight="bold">
                  1 Oct, 2022 10:00 PM{" "}
                </Text>
              </Box>
            </Flex>
          </Flex>
          <br />
          {/* car list data */}
          <Box maxH="500px" overflow="auto">
            {carData.map((car) => (
              <CarCard
                key={car.id}
                image={car.image}
                name={car.name}
                transmission={car.transmission}
                fuel={car.fuel}
                seats={car.seats}
                ratings={car.ratings}
                kms={car.kms}
                address={car.address}
                discount_price={car.discount_price}
                original_price={car.original_price}
              />
            ))}
          </Box>
        </Box>
      </Flex>
    </>
  );
}
