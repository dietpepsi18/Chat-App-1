/* The core management object module of Redux */

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension"; //This is mainly introduced to facilitate debugging on the browser side

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
); //create store object

export default store;
