//models for database

const md5 = require("blueimp-md5"); //Introduce the encryption function (used to encrypt the password and store it in the database)

/* 1 Connect to mongoose database*/
const mongoose = require("mongoose"); //1）引入mongoose

mongoose.connect(
  "mongodb+srv://xgg_0618:hongzuoguang@cluster0.lvukczu.mongodb.net/?retryWrites=true&w=majority"
);

const conn = mongoose.connection; //get connection object

//used to indicate that the connection is successful
conn.on("connected", function () {
  console.log("mongoDB连接成功");
});

/* ---------------------Model of the collection ‘users’ --------------------------------------- */

const USchema = mongoose.Schema;
const userSchema = new USchema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  type: { type: String, required: true },
  picture: { type: String },
  school: { type: String },
  major: { type: String },
  info: { type: String },
});

const UserModel = mongoose.model("user", userSchema); //The corresponding collection is named users

//module.exports = xxx （only exposed once）    exports.xxx = value （exposed more than once）
exports.UserModel = UserModel;

/* ---------------------Model of the collection ‘chats’--------------------------------------- */

const ChatSchema = mongoose.Schema;
const chatSchema = new ChatSchema({
  from: { type: String, required: true }, //id of the sender of the message
  to: { type: String, required: true }, // id of the receiver of the message
  chat_id: { type: String, required: true }, // from_to or to_from
  content: { type: String, required: true }, //
  create_time: { type: Number },
});

const ChatModel = mongoose.model("chat", chatSchema); //The corresponding collection is named chats

exports.ChatModel = ChatModel;
