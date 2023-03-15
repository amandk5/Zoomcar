import {
  Box,
  Button,
  Container,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { BsArrowLeft, BsMap } from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";
import { TbCurrentLocation } from "react-icons/tb";
import { VscLocation } from "react-icons/vsc";
import { AuthContext } from "../Context/AuthContextProvider";
import GetLocation from "./GetLocation";
import axios from "axios";
import Map from "./Map";

export default function SelectLocation({ openModal, setModalStatus }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [openMap, setMapStatus] = useState(false);

  const {
    changeLocation,
    isChangeCityLinkClicked,
    setIsChangeCityLinkClicked,
  } = useContext(AuthContext);

  const [inputLocation, setInputLocation] = useState("");

  // set get location status
  // const [allowLocation, setAllowLocation] = useState(false);
  //set the state
  const [location, setLocation] = useState({});
  const [updatedLocationStatus, setUpdatedLocationStatus] = useState(null);
  // state to keep track of select location button click
  const [isClicked, setIsClicked] = useState(false);

  //function to get the location
  const getLocation = () => {
    // navigator.geolocation.getCurrentPosition((position) => {
    //   const { latitude, longitude } = position.coords;
    //   setLocation(`latitude: ${latitude}, longitude: ${longitude}`);
    // });
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation(`latitude: ${latitude}, longitude: ${longitude}`);
        // set the select location button's setIsClicked to true
        setIsClicked(true);
      },
      (err) => {
        alert(`Please allow location services get your current location.`);
      }
    );
  };

  useEffect(() => {
    //console log the location if the location is not undefined
    if (location !== undefined && isClicked === true) {
      const latitude = location.latitude;
      const longitude = location.longitude;
      // console.log(location);
      // show text location in progress, set updatedLocationStatus to progress
      setUpdatedLocationStatus((status) => (status = "progress"));

      const updateLocation = async () => {
        await axios
          .get(
            `http://localhost:8080/user/location?latitude=${latitude}&longitude=${longitude}`
          )
          .then((res) => {
            // console.log(res.data);
            let foundLocation = res.data.location;
            // pass the foundLocation value to changeLocation function in authContext
            // also update the inputLocation text box
            setInputLocation(foundLocation);
            changeLocation(foundLocation);
            // once above line is executed ,set the setUpdatedLocationStatus to completed
            setUpdatedLocationStatus((status) => (status = "completed"));
            // after 500ms set the setUpdatedLocationStatus to null to remove any kind of notification
            setTimeout(() => {
              setUpdatedLocationStatus(null);
              // once its done, close the modal,and take user back to find car page
              onClose();
            }, 500);
          })
          .catch((err) => console.log(err));
      };

      updateLocation();
      // clean up code for isClicked
      return () => {
        setIsClicked(false);
      };
    }
  }, [isClicked]);

  useEffect(() => {
    if (openModal || isChangeCityLinkClicked) {
      onOpen();
      setModalStatus(false);
      setIsChangeCityLinkClicked(false);
    }
  });

  return (
    <>
      {
        /* when select location is clicked, mount the GetLocation component  */
        // allowLocation === true ? <GetLocation clicked={allowLocation} /> : null
      }
      {/* <Button onClick={onOpen}>Open Modal</Button> */}
      <Modal onClose={onClose} size="full" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <BsArrowLeft fontSize="30px" onClick={onClose} />
          </ModalHeader>
          <ModalBody>
            <Text>
              {updatedLocationStatus === "progress" &&
                "Getting current location..."}
              {updatedLocationStatus === "completed" && "location updated"}
            </Text>
            <Box w="100%" p="7">
              <Flex justifyContent="center" alignItems="center" flexWrap="wrap">
                <Flex
                  bg="white"
                  p="2"
                  alignItems="center"
                  border="1px solid gainsboro"
                  borderRadius="0.5rem"
                  cursor="pointer"
                >
                  <Box bgGradient="linear(to-r, green.50, green.50)">
                    <GoPrimitiveDot color="teal" />
                  </Box>
                  <Input
                    maxWidth="400px"
                    onClick={() => setModalStatus(true)}
                    placeholder="Select your starting point"
                    _focusVisible={false}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        onClose();
                      }
                    }}
                    value={inputLocation}
                    onChange={(e) => {
                      setInputLocation(e.target.value);
                      changeLocation(e.target.value);
                    }}
                    border="0"
                  />
                </Flex>
                <Button
                  _hover="none"
                  bg="white"
                  leftIcon={<TbCurrentLocation fontSize="40px" />}
                  onClick={getLocation}
                >
                  <Text>Current Location</Text>
                </Button>
                <Button
                  _hover="none"
                  bg="white"
                  leftIcon={<BsMap fontSize="40px" />}
                  onClick={() => setMapStatus(true)}
                >
                  <Text>Select Location on Map</Text>
                </Button>
              </Flex>
              <br />
              <Box w="90%" margin="auto" px="10" py="7" bg="#fbfbfb">
                <Flex w="100%" justifyContent="space-evenly" gap="5">
                  <Flex flexDirection="column" w="50%">
                    <Text px="7" py="2" mb="2" bg="#f5f5f5">
                      RECENTLY SEARCHED LOCATIONS
                    </Text>
                    <Box
                      fontWeight="normal"
                      fontSize="lg"
                      _hover="none"
                      bg="#fbfbfb"
                      display="flex"
                      cursor="pointer"
                    >
                      <VscLocation fontSize="50px" />
                      <Text
                        onClick={() => {
                          changeLocation("Bangalore");
                          onClose();
                        }}
                      >
                        Bangalore International Airport Terminal
                      </Text>
                    </Box>
                  </Flex>
                  <Flex flexDirection="column" w="50%">
                    <Text px="7" py="2" mb="2" bg="#f5f5f5">
                      SUGGESTED PICKUP LOCATIONS
                    </Text>
                    <Box
                      fontWeight="normal"
                      fontSize="lg"
                      _hover="none"
                      bg="#fbfbfb"
                      display="flex"
                      onClick={() => {
                        changeLocation("Bangalore");
                        onClose();
                      }}
                      cursor="pointer"
                    >
                      <VscLocation fontSize="50px" />
                      <Text>Bangalore International Airport Terminal</Text>
                    </Box>
                  </Flex>
                </Flex>
              </Box>
            </Box>
          </ModalBody>
          {/* map component  */}
          <Map openMap={openMap} setMapStatus={setMapStatus} />
          {/*  */}
        </ModalContent>
      </Modal>
    </>
  );
}
