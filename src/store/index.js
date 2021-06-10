import thunk from "redux-thunk";
import allreducer from "./reducer";
import { createStore, applyMiddleware } from "redux";

export default store = createStore(allreducer, {}, applyMiddleware(thunk));