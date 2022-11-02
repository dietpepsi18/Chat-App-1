const { ChatModel } = require("../mongoDB/models.js");

module.exports = function (server) {
  const io = require("socket.io")(server, { cors: { origin: "*" } });

  io.on("connection", function (socket) {
    console.log("Already connected to a client");

    socket.on("sendMsg", function ({ from, to, content }) {
      const create_time = Date.now();
      const chat_id = [from, to].sort().join("_");
      console.log("server side received a message：", { from, to, content });

      const chatObj = new ChatModel({
        from: from,
        to: to,
        chat_id: chat_id,
        content: content,
        create_time: create_time,
      });

      chatObj.save(function (error, doc) {
        io.emit("receiveMsg", doc); //io.emit： send message to all client
      });
    });
  });
};
