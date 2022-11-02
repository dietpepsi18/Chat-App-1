/* Reducer is used for initializing state, processing state
   Each state in redux can have a reducer serving it, and reducer is a function
   reducerThe function will receive two parameters: the previous state preState, the action object
   The return value is the value of the new state
*/

/* When redux needs to store multiple state, use objects
   also need to merge the reducers of multiple status, by using combineReducers() to merge all the reducers*/
import { combineReducers } from "redux";

import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST,
  RECEIVE_MSG_LIST,
  RECEIVE_MSG,
} from "./action_types.js";

//initializing state（does not need the password attribute, because the backend will not return the user password to the frontend）
const initUser = {
  username: "",
  type: "",
  msg: "", //to store error message information
  redirectTo: "", //paths for automatic redirection
};

/*   ---------------------The following are reducer used to manipulate the 'user' state -------------------- */
//(The return value is the value of the new state)
function user(state = initUser, action) {
  switch (action.type) {
    case AUTH_SUCCESS: //Successful registration/login
      return {
        ...action.data,
        redirectTo: getRedirectTo(action.data.type, action.data.picture),
      }; //Once the registration is successful, it will automatically jump to the main interface

    case ERROR_MSG: //Registration/login failed
      return { ...state, msg: action.msg };

    case RECEIVE_USER: //User information updated successfully
      return action.data;

    case RESET_USER: //User information update failed
      return { ...initUser, msg: action.msg };

    default:
      return state;
  }
}

/* After registration/login, automatic jump needs to be divided according to the situation：
  To jump to the main component：
    Student：/student
    Teacher：/teacher
  
    To jump to the information update component：
      Student：/studentinfo
      Teacher：/teacherinfo

  To determine whether the information is complete, check if user.picture has a value
*/

//Define a function: used to dynamically generate a jump path and return the corresponding routing path
function getRedirectTo(type, picture) {
  let path = "";
  if (type === "teacher") {
    path = "/teacher";
  } else {
    path = "/student";
  }

  if (!picture) {
    path += "info";
  }

  return path;
}

/*   ---------------------The following are reducer used to manipulate the 'userList' state -------------------- */

//initializing state
const initUserList = [];

function userList(state = initUserList, action) {
  switch (action.type) {
    case RECEIVE_USER_LIST:
      return action.data;
    default:
      return state;
  }
}

/*   ---------------------The following are reducer used to manipulate the 'chat' state -------------------- */

//initializing state
const initChat = {
  users: {}, //all users information：key：userid，value值：{username: XXX, picture: ZZZ}
  chatMsgs: [], //an array of all relevant msgs for the current user
};

function chat(state = initChat, action) {
  switch (action.type) {
    case RECEIVE_MSG_LIST:
      const { users, chatMsgs } = action.data;

      return {
        users: users,
        chatMsgs: chatMsgs,
      };

    case RECEIVE_MSG:
      const { chatMsg } = action.data;
      return {
        users: state.users,
        chatMsgs: [...state.chatMsgs, chatMsg],
      };

    default:
      return state;
  }
}

//combine reducers by using combineReducers() method
//An object is passed in as parameter, which is the state object in redux
export default combineReducers({
  user, //user state is an object
  userList, //userList state is an array
  chat, //chat state is an object
});
