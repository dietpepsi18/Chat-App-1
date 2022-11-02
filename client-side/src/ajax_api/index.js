//This file is used to send AJAX requests to the server side

import axios from "axios";

/* axioshas two methods for sending requests: both of them will get a Promise object as return value
    1）axios.get(url)   send a GET request
    2) axios.post(url, data)  send a POST request
*/

/* ---------First create a general function that can send various requests according to parameters
            （will get a Promise object as return value）------------------------------------------ */

//parameter url: request path
//parameter data：the default is an empty object
//parameter type：the default is "GET"

function ajax(url, data = {}, type = "GET") {
  if (type === "GET") {
    //If send a GET request, need to splice the parameters into the url，e.g.：http://localhost:5050?username=tom&password=123
    let paramStr = "";
    //traverse each key-value pair in the parameter object
    Object.keys(data).forEach((key) => {
      paramStr = paramStr + key + "=" + data[key] + "&";
    });
    if (paramStr !== "") {
      paramStr = paramStr.substring(0, paramStr.length - 1); //remove the '&' from the end of the string
    }
    let newUrl = url + "?" + paramStr;

    return axios.get(newUrl); //send a GET request, get a Promise object as return value
  } else if (type === "POST") {
    return axios.post(url, data); //send a POST request, get a Promise object as return value
  }
}

/* ---------------------Send different AJAX requests according to different interfaces----------------------- */

//The function that sends the registration request to the server （The parameter user is the user information object collected by the front end）
export const reqRegister = (user) => {
  return ajax("/register", user, "POST"); //send request to "localhost:5050/register"
};

//The function that sends the login request
export const reqLogin = (user) => {
  return ajax("/login", user, "POST");
};

//The function that sends a request to update user information
export const reqUpdate = (user) => {
  return ajax("/update", user, "POST");
};

//The function that sends a request to get user information
export const reqUser = () => {
  return ajax("/user");
};

//The function for a request to get a list of users
export const reqUserList = (type) => {
  return ajax("/userlist", { type });
};

//The function that get the list of chat messages of the current user
export const reqChatMsgList = () => {
  return ajax("/msglist");
};
