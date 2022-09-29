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
import { useEffect, useState } from "react";
import { BsArrowLeft, BsMap } from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";
import { TbCurrentLocation } from "react-icons/tb";
import { VscLocation } from "react-icons/vsc";
import Map from "./Map";

export default function SelectLocation({ openModal, setModalStatus }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [openMap, setMapStatus] = useState(false);

  useEffect(() => {
    if (openModal) {
      onOpen();
      setModalStatus(false);
    }
  });

  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}
      <Modal onClose={onClose} size="full" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <BsArrowLeft fontSize="30px" onClick={onClose} />
          </ModalHeader>
          <ModalBody>
            <Container maxW="80%" p="7" centerContent>
              <Flex
                w="80%"
                justifyContent="center"
                alignItems="center"
                flexWrap="wrap"
              >
                <Flex
                  w="50%"
                  bg="white"
                  p="3"
                  alignItems="center"
                  gap="2"
                  border="1px solid gainsboro"
                  borderRadius="0.5rem"
                  cursor="pointer"
                >
                  <Box bgGradient="linear(to-r, green.50, green.50)">
                    <GoPrimitiveDot color="teal" />
                  </Box>
                  <Input
                    onClick={() => setModalStatus(true)}
                    placeholder="Select your starting point"
                    _focusVisible={false}
                    border="0"
                  />
                </Flex>
                <Button
                  _hover="none"
                  bg="white"
                  leftIcon={<TbCurrentLocation fontSize="40px" />}
                  w="25%"
                  h="100"
                >
                  Current Location
                </Button>
                <Button
                  _hover="none"
                  bg="white"
                  leftIcon={<BsMap fontSize="40px" />}
                  w="25%"
                  h="100"
                  onClick={() => setMapStatus(true)}
                >
                  Select Location on Map
                </Button>
              </Flex>
              <br />
              <Box w="80%" px="10" py="7" bg="#fbfbfb">
                <Flex w="100%" justifyContent="space-evenly" gap="5">
                  <Flex flexDirection="column" w="50%">
                    <Text px="7" py="2" mb="2" bg="#f5f5f5">
                      RECENTLY SEARCHED LOCATIONS
                    </Text>
                    <Button
                      leftIcon={<VscLocation fontSize="50px" />}
                      fontWeight="normal"
                      fontSize="lg"
                      _hover="none"
                      bg="#fbfbfb"
                    >
                      Bangalore International Airport Terminal
                    </Button>
                  </Flex>
                  <Flex flexDirection="column" w="50%">
                    <Text px="7" py="2" mb="2" bg="#f5f5f5">
                      SUGGESTED PICKUP LOCATIONS
                    </Text>
                    <Button
                      leftIcon={<VscLocation fontSize="50px" />}
                      fontWeight="normal"
                      fontSize="lg"
                      _hover="none"
                      bg="#fbfbfb"
                    >
                      Bangalore International Airport Terminal
                    </Button>
                  </Flex>
                </Flex>
              </Box>
            </Container>
          </ModalBody>
          {/* map component  */}
          <Map openMap={openMap} setMapStatus={setMapStatus} />
          {/*  */}
        </ModalContent>
      </Modal>
    </>
  );
}
