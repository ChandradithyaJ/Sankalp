/*** Server run by Node and Express ***/

require("dotenv").config();

const express = require("express"); // ExpressJS
const cors = require("cors");

const { corsOptions } = require("./config/corsOptions");
const verifyJWT = require("./middleware/verifyJWT");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
connectDB(); // connect to MongoDB

const app = express(); // main server component

const PORT = process.env.PORT || 3500; // running on PORT

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware for form data (urlencoded data)
app.use(express.urlencoded({ extended: true }));

// built-in middleware for json
app.use(express.json({ limit: "50mb" }));

// translate route
app.use('/translate', require('./routes/translate'))
// register route
app.use("/register", require("./routes/register"));
// login route
app.use("/auth", require("./routes/auth"));
// update JWT if expired route
app.use("/updateJWT", require("./routes/updateJWT"));
// news api route
app.use("/news", require("./routes/api/news"));

// custom middleware for verifying JWTs
app.use(verifyJWT);
// users route
app.use("/users", require("./routes/api/users"));
// stories route
app.use("/stories", require("./routes/api/stories"));
// profile pic routes
app.use("/cloudinary", require("./routes/api/pics"));

// run the app on PORT
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
});
