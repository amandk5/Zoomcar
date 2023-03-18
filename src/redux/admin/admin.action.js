import axios from "axios";
import { GET_ALL_CARS, GET_ALL_USERS } from "./admin.types";

// get all cars from db
export const getAllCars = () => async (dispatch) => {
  await axios
    .get("https://zoomcar-api-two.vercel.app/cars")
    .then((res) => {
      dispatch({ type: GET_ALL_CARS, payload: res.data });
    })
    .catch((err) => "error");
};

// get all users from db
export const getAllUsers = () => async (dispatch) => {
  // let admin token
  let token = localStorage.getItem("token");

  await axios
    .get("https://zoomcar-api-two.vercel.app/admin/list/users", {
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    })
    .then((res) => {
      let users = res.data.users;
      console.log(users);
      dispatch({ type: GET_ALL_USERS, payload: users });
    })
    .catch((err) => "error");
};
