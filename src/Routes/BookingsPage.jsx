import { Box, Heading } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import CarCard from "../Components/CarCard";
import Navbar from "../Components/Navbar";

const getBookingsData = async () => {
  // get token from ls
  let token = localStorage.getItem("token");

  return await axios.get("https://zoomcar-api-two.vercel.app/show-bookings", {
    headers: {
      token: token,
    },
  });
  // old
  // return await axios.get("https://json-server-p1rm.onrender.com/bookings");
};

export default function BookingsPage() {
  const [carData, setData] = useState([]);

  useEffect(() => {
    fetchAndUpdateCarData();
  }, []);

  const fetchAndUpdateCarData = () => {
    getBookingsData().then((res) => {
      let data = res.data;
      setData(data);
      // console.log(data);
    });
  };

  const cancelBooking = async (carId) => {
    // get token from ls
    let token = localStorage.getItem("token");
    // console.log(carId);
    return await axios
      .post(
        "https://zoomcar-api-two.vercel.app/cancel-booking",
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
        alert("Booking cancellation successful");
        // update the page
        fetchAndUpdateCarData();
      })
      .catch((err) => {
        alert("booking cancellation failed");
      });

    // old one
    // return await axios
    //   .delete(`https://json-server-p1rm.onrender.com/bookings/${id}`)
    //   .then(() => {
    //     alert("Booking Cancellation Successful");
    //     fetchAndUpdateCarData();
    //   });
  };

  return (
    <>
      <Navbar />
      <Heading m="2" size="md">
        BookingsPage
      </Heading>
      <Box w="70%" margin="auto">
        {/* car list data */}
        <Box maxH="500px" overflow="auto">
          {carData.map((car) => (
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
              isBooked={true}
              delete_id={car._id}
              cancelBooking={cancelBooking}
            />
          ))}
        </Box>
      </Box>
    </>
  );
}
