import {
  legacy_createStore,
  combineReducers,
  compose,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { adminReducer } from "./admin/admin.reducer";

const rootReducer = combineReducers({
  admin: adminReducer,
});

const createComposer = compose;

export const store = legacy_createStore(
  rootReducer,
  createComposer(applyMiddleware(thunk))
);
