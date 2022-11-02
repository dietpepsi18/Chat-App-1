//Rules for defining server-side routing access

const express = require("express");
const UserModel = require("../mongoDB/models.js").UserModel;
const ChatModel = require("../mongoDB/models.js").ChatModel;
const md5 = require("blueimp-md5");

//Create a route object
const router = express.Router();

/* ------------------------Define access rules for "/register"----------------------- */
router.post("/register", function (req, res) {
  //1）Get request parameters (POST request, request parameters are stored in req.body)
  const { username, password, type } = req.body;

  //2）Data processing(When registering an account, need to save data in the database)
  //    Determine whether the user already exists, if so, return an error message, if not, save the data to the database
  UserModel.findOne({ username: username }, function (error, doc) {
    if (doc != null) {
      res.send({ code: 1, msg: "account already exist" }); //there is a ‘code’ attribute in the object, 0 means normal, 1 means error
    } else {
      let userObj = new UserModel({
        username: username,
        password: md5(password),
        type: type,
      });
      userObj.save(function (error, doc) {
        //After the data is stored in the database, the user registration information is returned to the front end
        let data = {
          username: username,
          type: type,
          _id: doc._id,
        };

        //A cookie is generated on the browser side, so that even after the browser is closed, no login is required within 24 hours
        res.cookie("userid", doc._id, { maxAge: 1000 * 60 * 60 * 24 });

        res.send({ code: 0, data: data });
      });
    }
  });
});

/* ------------------------Define access rules for "/login"----------------------- */
router.post("/login", function (req, res) {
  const { username, password } = req.body;

  //When logging in, check whether the user exists and whether the password is correct.
  UserModel.findOne(
    { username: username, password: md5(password) },
    { password: 0 }, //The data returned should not contain the password attribute
    function (error, doc) {
      //Successful login: return user information to the front end
      if (doc != null) {
        res.cookie("userid", doc._id, { maxAge: 1000 * 60 * 60 * 24 });
        res.send({ code: 0, data: doc });
      } else {
        res.send({ code: 1, msg: "Incorrect username or password" });
      }
    }
  );
});

/* ------------------------Define access rules for "/update"----------------------- */
router.post("/update", function (req, res) {
  //get "userid" from request cookie

  const userid = req.cookies.userid;

  //If the userid is not found, need to log in again
  if (!userid) {
    res.send({ code: 1, msg: "Please log in first" });
    return;
  }

  //update the corresponding user document in the database according to the userid
  const { picture, school, major, info } = req.body;
  const userUpdate = { picture, school, major, info };
  UserModel.findByIdAndUpdate(
    { _id: userid },
    userUpdate,
    function (error, olddoc) {
      const { _id, username, type } = olddoc;
      const newdata = Object.assign(userUpdate, { _id, username, type });
      res.send({ code: 0, data: newdata });
    }
  );
});

/* -------------Define access rules for "/user"----------------------- */
router.get("/user", function (req, res) {
  const userid = req.cookies.userid;
  if (!userid) {
    res.send({ code: 1, msg: "Please log in first" });
    return;
  }

  UserModel.findOne({ _id: userid }, { password: 0 }, function (error, doc) {
    res.send({ code: 0, data: doc });
  });
});

/* -----------------------------------------Get a list of users based on user type----------------------- */
router.get("/userlist", function (req, res) {
  const { type } = req.query;

  UserModel.find({ type: type }, { password: 0 }, function (error, docs) {
    res.send({ code: 0, data: docs });
  });
});

/* ---------------------Get a list of all relevant chat messages of the current user----------------------- */
router.get("/msglist", function (req, res) {
  const userid = req.cookies.userid;

  UserModel.find(function (err, userDocs) {
    const users = {};
    userDocs.forEach((doc) => {
      users[doc._id] = { username: doc.username, picture: doc.picture };
    });

    ChatModel.find(
      { $or: [{ from: userid }, { to: userid }] },
      { password: 0 },
      function (err, chatMsgs) {
        res.send({ code: 0, data: { users, chatMsgs } });
      }
    );
  });
});

module.exports = router;
