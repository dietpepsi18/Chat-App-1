/* Generate actions:
   action contains two properties：
        1) type： action's ID, string type, unique, required
        2) data： any type, optional
   Each type corresponds to an action object
   Contains synchronous and asynchronous actions
*/

import {
  reqLogin,
  reqRegister,
  reqUpdate,
  reqUser,
  reqUserList,
  reqChatMsgList,
} from "../ajax_api";
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST,
  RECEIVE_MSG_LIST,
  RECEIVE_MSG,
} from "./action_types.js";

import { io } from "socket.io-client";

/* ============================================================================*/
//synchronous action：(a synchronous action for each action type)
const authSuccess = (user) => ({ type: AUTH_SUCCESS, data: user });
const errorMsg = (msg) => ({ type: ERROR_MSG, data: msg });
const receiveUser = (user) => ({ type: RECEIVE_USER, data: user });
export const resetUser = (msg) => ({ type: RESET_USER, data: msg });

const receiveUserList = (userList) => ({
  type: RECEIVE_USER_LIST,
  data: userList,
});

const receiveMsgList = ({ users, chatMsgs, userid }) => ({
  type: RECEIVE_MSG_LIST,
  data: { users, chatMsgs, userid },
});

const receiveMsg = (chatMsg, userid) => ({
  type: RECEIVE_MSG,
  data: { chatMsg, userid },
});

//================== asynchronous actions ===================================

/* --------------------- Return an asynchronous actions for registering user--------------------*/
export const register = (user) => {
  //Check the data input by user before making an asynchronous request：
  //When the two passwords are inconsistent during registration， dispatch an ERROR_MSG action
  if (user.password !== user.password2) {
    return errorMsg("Passwords do not match");
  }

  //When the username is empty, dispatch an ERROR_MSG action
  if (!user.username) {
    return errorMsg("username cannot be empty");
  }

  //Returns a function for sending an asynchronous action of ajax request, the function parameter is dispatch
  return async (dispatch) => {
    const response = await reqRegister(user);
    const result = response.data;

    //check whether the returned data is successful after sending the registration request
    if (result.code === 0) {
      getMsgList(dispatch, result.data._id); //the message list will be obtained at this time
      dispatch(authSuccess(result.data));
    } else {
      dispatch({ type: ERROR_MSG, msg: result.msg });
    }
  };
};

/* -------------------------Return an asynchronous actions for logging in---------------------- */
export const login = (user) => {
  if (!user.username) {
    return { type: ERROR_MSG, msg: "username cannot be empty" };
  }
  if (!user.password) {
    return { type: ERROR_MSG, msg: "password cannot be empty" };
  }

  return async (dispatch) => {
    const response = await reqLogin(user);
    const result = response.data;

    if (result.code === 0) {
      getMsgList(dispatch, result.data._id);
      dispatch({ type: AUTH_SUCCESS, data: result.data });
    } else {
      dispatch({ type: ERROR_MSG, msg: result.msg });
    }
  };
};

/* -------------------------Return an asynchronous actions for updating user‘s information---------------------- */
export const updateUser = (user) => {
  return async (dispatch) => {
    const response = await reqUpdate(user);
    const result = response.data;

    if (result.code === 0) {
      getMsgList(dispatch, result.data._id);
      dispatch(receiveUser(result.data));
    } else {
      dispatch(resetUser(result.msg));
    }
  };
};

/* -------------------------Return an asynchronous actions for getting user‘s information---------------------- */
export const getUser = () => {
  return async (dispatch) => {
    const response = await reqUser();
    const result = response.data;

    if (result.code === 0) {
      getMsgList(dispatch, result.data._id);
      dispatch(receiveUser(result.data));
    } else {
      dispatch(resetUser(result.msg));
    }
  };
};

/* -------------------------Return an asynchronous actions for getting users list---------------------- */
export const getUserList = (type) => {
  return async (dispatch) => {
    const response = await reqUserList(type);
    const result = response.data;

    if (result.code === 0) {
      dispatch(receiveUserList(result.data));
    }
  };
};

/* ================================================================================= */

/* -------------------------socket for connecting to the server---------------------------- */

function initIO(dispatch, userId) {
  //When there is no socket attribute on the io function object, it means that there is no socket object yet
  if (!io.socket) {
    io.socket = io("http://localhost:5050"); // Connect to the server, get the connection object to the server
    //const socket = io("http://localhost:5050");

    io.socket.on("connection");

    io.socket.on("receiveMsg", function (chatMsg) {
      //Only when the chatMsg returned by the server is a message related to the current user
      // the action will be dispatched to store the state
      if (chatMsg.to === userId || chatMsg.from === userId) {
        dispatch(receiveMsg(chatMsg, userId));
      }
    });
  }
}

/* ------------------Return an asynchronous actions for send message (using SocketIO)---------------------- */
export const sendMsg = ({ from, to, content }) => {
  return (dispatch) => {
    io.socket.emit("sendMsg", { from, to, content }); //Send messages to the server through the socket object
  };
};

//once the user logs in successfully, call this function to get the message list
async function getMsgList(dispatch, userId) {
  initIO(dispatch, userId); //Make sure socketIO is connected
  const response = await reqChatMsgList();
  const result = response.data;

  if (result.code === 0) {
    const { users, chatMsgs } = result.data;
    dispatch(
      receiveMsgList({ users: users, chatMsgs: chatMsgs, userid: userId })
    );
  }
}
