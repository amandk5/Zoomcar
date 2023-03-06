const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const CarModel = require("../models/car.model");
const BookingModel = require("../models/booking.model");
const { db } = require("../models/user.model");

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

// filter cars based on car Type
router.get("/get-cars/:type", async (req, res) => {
  let { type } = req.params;
  await CarModel.find({ car_type: type })
    .then((resp) => {
      res.send(resp);
    })
    .catch((err) => {
      res.send(err);
    });
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

module.exports = router;
