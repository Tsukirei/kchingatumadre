require("./database/config");

var userRouter = require("./routers/user");
var tagRouter = require("./routers/tag");
var projectRouter = require("./routers/project");
var commentRouter = require("./routers/comment");
var favRouter = require("./routers/fav");
var reportCommentRouter = require("./routers/reportComment");
var reportProjectRouter = require("./routers/reportProject");

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var helmet = require("helmet");

var app = express();

app.use(logger("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", userRouter);
app.use("/tags", tagRouter);
app.use("/project", projectRouter);
app.use("/comment", commentRouter);
app.use("/fav", favRouter);
app.use("/reportComment", reportCommentRouter);
app.use("/reportProject", reportProjectRouter);

module.exports = app;