import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { GoPrimitiveDot } from "react-icons/go";
import SortAndFilters from "../Components/SortAndFilters";

export default function ResultsPage() {
  return (
    <Flex justifyContent="center" gap="5" py="3">
      <SortAndFilters />
      <Box w="68%" border="1px solid black" h="500px">
        <Flex>
          <Flex
            w="50%"
            p="2"
            alignItems="center"
            gap="2"
            border="1px solid black"
            borderRadius="0.5rem"
            cursor="pointer"
          >
            <Box bgGradient="linear(to-r, green.50, green.50)">
              <GoPrimitiveDot color="teal" />
            </Box>
            <Box opacity="0.5">Pick Up CIty, Airport, Address Or Hotel</Box>
          </Flex>
          <Flex
            w="50%"
            p="2"
            alignItems="center"
            gap="2"
            border="1px solid black"
            borderRadius="0.5rem"
            cursor="pointer"
          >
            <Box bgGradient="linear(to-r, green.50, green.50)">
              <GoPrimitiveDot color="teal" />
            </Box>
            <Box opacity="0.5">Pick Up CIty, Airport, Address Or Hotel</Box>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}
