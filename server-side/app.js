const express = require("express");

const indexRouter = require("./routers/index.js");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

const server = require("http").createServer(app);

require("./socketIO/socketIO_server.js")(server);

app.use("/", indexRouter);

server.listen(5050, () => {
  console.log("Server started on PORT 5050");
});
