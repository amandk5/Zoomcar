import { GET_ALL_CARS, GET_ALL_USERS } from "./admin.types";

const initState = {
  cars: [],
  users: [],
};

export const adminReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ALL_CARS:
      return {
        ...state,
        cars: action.payload,
      };
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};
