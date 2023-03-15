const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const CarModel = require("../models/car.model");
const BookingModel = require("../models/booking.model");
const { db } = require("../models/user.model");
const axios = require("axios");

// access/api key for position stack
const POSITIONSTACK_ACCESS_KEY = process.env.POSITIONSTACK_ACCESS_KEY;

// home page
router.get("/", (req, res) => {
  res.send("home");
});

// register route
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = new UserModel({ name, email, password });
  //   save new user details into db

  await newUser
    .save()
    .then(() => res.status(201).send("user registered successfully"))
    .catch(() => res.send("failed to register"));
});

// login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  const user = await UserModel.findOne({ email, password });
  // const user = {
  //   email: email,
  //   password: password,
  // };
  if (user) {
    // generate the token
    // 3 parts of token - header , payload, signature/secret
    // header generated automatically

    const token = jwt.sign({ id: user._id, email: user.email }, "SECRET1234");

    // to verify the token
    // jwt.verify(token,"SECRET1234")
    res.send({ message: "Login Success", token });
  } else {
    res.status(401).send("Invalid credentials");
  }
});

// get all cars api
router.get("/cars", async (req, res) => {
  await CarModel.find({})
    .then((resp) => {
      res.send(resp);
    })
    .catch((err) => {
      res.send(err);
    });
});

// search cars by car name provided
router.get("/search/:car", async (req, res) => {
  let { car } = req.params;
  // search car in db
  await CarModel.findOne({ name: { $regex: `${car}`, $options: "i" } })
    .then((resp) => res.send(resp))
    .catch((err) => res.send(err));
});

// filter cars based on car Type
router.get("/get-cars/:type", async (req, res) => {
  let { type } = req.params;

  //set filterType as car_type, fuel_type, seats, transmission based on params;

  let filterType = {};
  if (
    type === "suv" ||
    type === "sedan" ||
    type === "hatchback" ||
    type === "luxury"
  ) {
    filterType = { car_type: type };
  } else if (
    type === "Petrol" ||
    type === "Diesel" ||
    type === "CNG" ||
    type === "Electric"
  ) {
    filterType = { fuel: type };
  } else if (type === "4 Seats" || type === "5 Seats" || type === "7 Seats") {
    filterType = { seats: type };
    // console.log(filterType)
  } else if (type === "Manual" || type === "Automatic") {
    filterType = { transmission: type };
  } else if (type === "3" || type === "4" || type === "All") {
    filterType = { ratings: type };
    if (type === "All") {
      // if type is all , send all the car with all ratings
      await CarModel.find({})
        .then((resp) => {
          res.send(resp);
        })
        .catch((err) => {
          res.send(err);
        });
    } else {
      await CarModel.find({ ratings: { $gt: Math.floor(Number(type)) } })
        .then((resp) => {
          res.send(resp);
        })
        .catch((err) => {
          res.send(err);
        });
    }
  }

  // if filterType object does not contain "ratings", then
  if (filterType.ratings === undefined) {
    await CarModel.find(filterType)
      .then((resp) => {
        res.send(resp);
      })
      .catch((err) => {
        res.send(err);
      });
  }
  // console.log(type);
});

// add booking
router.post("/booking", async (req, res) => {
  const { token } = req.headers;
  // console.log(token);

  // token is required, if no token found , return err
  if (token === undefined) {
    res.send("token is required to access this api");
  }
  // get car id
  const { car_id } = req.body;
  // console.log(token);

  // decode token
  const decoded = jwt.decode(token);
  // console.log(decoded);

  const user_id = decoded.id;

  // first check in db,wheather the user already exist
  let user = await BookingModel.findOne({ user: user_id });
  // console.log(user, car_id);

  if (user === null) {
    // if booking is done for the first time

    const newBooking = new BookingModel({
      user: user_id,
      cars: [car_id],
    });

    await newBooking
      .save()
      .then((resp) => res.send("booking successful"))
      .catch((err) => res.send("booking failed"));
  } else {
    // if user already exists and made the booking before

    await BookingModel.findOneAndUpdate(
      {
        user: user_id,
      },
      {
        cars: [...user.cars, car_id],
      }
    )
      .then((resp) => res.send("booking successful"))
      .catch((err) => res.send("booking failed"));
  }
});

// get bookings Data by user id
router.get("/show-bookings", async (req, res) => {
  const { token } = req.headers;
  // console.log(token);

  // token is required, if no token found , return err
  if (token === undefined) {
    res.send("token is required to access this api");
  }
  // console.log(token);

  // decode token
  const decoded = jwt.decode(token);
  // console.log(decoded);

  const user_id = decoded.id;
  // console.log(token, user_id);

  await BookingModel.findOne({ user: user_id })
    // .populate("user")
    .populate("cars")
    .exec(function (err, resp) {
      if (err) {
        res.send(err);
      }
      // send car array as response
      res.send(resp.cars);
    });
});

// remove booking api
router.post("/cancel-booking", async (req, res) => {
  const { token } = req.headers;
  const { car_id } = req.body;
  // console.log(token);

  // token is required, if no token found , return err
  if (token === undefined) {
    res.send("token is required to access this api");
  }
  // console.log(token);

  // decode token
  const decoded = jwt.decode(token);
  // console.log(decoded);

  const user_id = decoded.id;
  // console.log(token, user_id);

  await BookingModel.findOneAndUpdate(
    { user: user_id },
    {
      $pull: { cars: car_id },
    }
  )
    .then((resp) => {
      res.send("booking cancelled");
    })
    .catch((err) => {
      res.send(err);
    });
});

// get user location, get latitude and longitude
router.get("/user/location", async (req, res) => {
  // get latitude and longitude from req.query
  const { latitude, longitude } = req.query;

  // once latitude and longitude received, make a get request to positionstack to get
  // the location
  if (latitude !== undefined && longitude !== undefined) {
    await axios
      .get(
        `http://api.positionstack.com/v1/reverse?access_key=${POSITIONSTACK_ACCESS_KEY}&query=21.2514,81.6296`
      )
      .then((resp) => {
        let data = resp.data.data;
        // get locality from data[0]
        let location = [...data][0].locality;
        // console.log(location);
        res.status(200).send({ location: location });
      })
      .catch((err) => console.log(err));
  } else {
    res.status(401).send({ error: "failed to get the location" });
  }
});

module.exports = router;
