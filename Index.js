const morgan = require("morgan");
const express = require("express");

const app = express();

const search = require("./Api/search");

app.use(morgan("dev"));
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "GET, PUT, POST, DELETE, PATCH "
    );
    return res.status(200).json({});
  }
  next();
});

app.use(express.static("public"));
app.use("/search", search);
app.use((req, res, next) => {
  const error = new Error("Sorry, Not Found !");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
      error: error.status,
    },
  });
});

const PORT = process.env.PORT || 3001;

// n()

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
