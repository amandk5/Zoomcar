import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { GoPrimitiveDot } from "react-icons/go";
import { BsArrowRight } from "react-icons/bs";
import SortAndFilters from "../Components/SortAndFilters";
import CarCard from "../Components/CarCard";

import carData from "../Db/db.json";
import Navbar from "../Components/Navbar";
import axios from "axios";
import SmallScreenCarCard from "../Components/SmallScreenCarCard";

const addToBooking = async (carId) => {
  // get token from ls
  let token = localStorage.getItem("token");

  await axios
    .post(
      "https://zoomcar-api-two.vercel.app/booking",
      {
        car_id: carId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    )
    .then((res) => {
      alert("car booking successful");
    })
    .catch((err) => {
      console.log(err);
    });
  // old
  // return axios
  //   .post(`https://json-server-p1rm.onrender.com/bookings`, {
  //     image: carObj.image,
  //     name: carObj.name,
  //     transmission: carObj.transmission,
  //     fuel: carObj.fuel,
  //     seats: carObj.seats,
  //     ratings: carObj.ratings,
  //     kms: carObj.kms,
  //     address: carObj.address,
  //     discount_price: carObj.discount_price,
  //     original_price: carObj.original_price,
  //   })
  //   .then(() => {
  //     alert("booking successful");
  //   });
};

export default function ResultsPage() {
  const [isSmallerThan950] = useMediaQuery("(max-width: 950px)");
  const [isSmallerThan650] = useMediaQuery("(max-width: 650px)");

  // for storing cars data
  const [carsArray, setCarsArray] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);

  // function to get cars data
  const getAllCars = async () => {
    await axios
      .get("https://zoomcar-api-two.vercel.app/cars")
      .then((res) => {
        setCarsArray(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // axios
    //   .get("https://zoomcar-api-two.vercel.app/cars")
    //   .then((res) => {
    //     setCarsArray(res.data);
    //   })
    //   .catch((err) => console.log(err));
    getAllCars();
  }, []);

  // function to handle filter car
  const handleFilteredCars = (filteredCarsData) => {
    // console.log(filteredCarsData);
    // set the carsArray with received filtered cars
    setCarsArray(filteredCarsData);

    // if filteredCarsData === "" , refetch all cars , run getallcars fn
    if (filteredCarsData === "") {
      setCarsArray([]);
      // , run getallcars fn
      getAllCars();
    } else {
      setCarsArray(filteredCarsData);
    }
  };

  return (
    <>
      <Navbar />
      <Flex justifyContent="center" gap="4" py="3" flexWrap="wrap" bg="#f5f5f5">
        {!isSmallerThan950 && (
          <SortAndFilters handleFilteredCars={handleFilteredCars} />
        )}
        {/* car list  */}
        <Box w={!isSmallerThan950 ? "68%" : "95%"}>
          {/* top section */}
          {!isSmallerThan650 && (
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
                wrap={"wrap"}
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
          )}
          <br />
          {/* car list data */}
          <Box
            maxH={!isSmallerThan650 && "500px"}
            overflow={!isSmallerThan650 && "auto"}
          >
            {!isSmallerThan650
              ? carsArray.map((car) => (
                  <CarCard
                    key={car._id}
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
                    carId={car._id}
                    addToBooking={addToBooking}
                  />
                ))
              : carsArray.map((car) => (
                  <SmallScreenCarCard
                    key={car._id}
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
                    carId={car._id}
                    addToBooking={addToBooking}
                  />
                ))}
          </Box>
        </Box>
      </Flex>
    </>
  );
}
