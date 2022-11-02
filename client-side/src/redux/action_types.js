/* This is a constant module to define the constant value of action's type, to prevent wrong words */

/* ----------user state's action type-------- */
export const AUTH_SUCCESS = "auth_success"; //Successful registration/login
export const ERROR_MSG = "error_msg"; //provide error messages
export const RECEIVE_USER = "receive-user"; //Receive user (when user's information is updated)
export const RESET_USER = "reset-user"; //reset user info（when user's information is updated)

/* ----------userlist state's action type-------- */
export const RECEIVE_USER_LIST = "receive_user_list"; //Receive user list

/* ----------chat state's action type-------- */
export const RECEIVE_MSG_LIST = "receive_msg_list"; //Receive a list of all messages related to the current user
export const RECEIVE_MSG = "receive_msg"; //receive a message
