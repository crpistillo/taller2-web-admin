import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { appReducer } from "./redux/appReducers";
import { loginReducer } from "./redux/loginReducer";
import { signUpReducer } from "./redux/signUpReducer";
import { forgotPasswordReducer } from "./redux/forgotPasswordReducers";
import { newPasswordReducer } from "./redux/newPasswordReducers";
import { createUserReducer } from "./redux/createUserReducers";
import { listUsersReducer } from "./redux/listUsersReducers";
import { editModalReducer } from "./redux/editModalReducers";

require('dotenv').config()

require('dotenv').config()

const reducers = combineReducers({
  appReducer,
  loginReducer,
  signUpReducer,
  createUserReducer,
  listUsersReducer,
  forgotPasswordReducer,
  newPasswordReducer,
  editModalReducer,
});

export const store = createStore(reducers);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
