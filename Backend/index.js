var express = require("express");
var cors = require("cors");
var app = express();
var routes = require("./app/routes");
var mongoose = require("mongoose");
const bodyParser = require("body-parser");
var errorHandlers = require("./app/errorHandlers");
var passport = require("passport");
require("./app/config/passport");

app.set("port", process.env.PORT || 3000);
app.use(cors());

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
// views is directory for all template files
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(passport.initialize());
app.use("/", routes);

app.use(errorHandlers.notFound);
app.use(errorHandlers.devErrors);

app.listen(app.get("port"), async function() {
  let mongoDbUrl = "";
  if(process.env.MONGODB_URL) {
    mongoDbUrl = process.env.MONGODB_URL;
  } else {
    mongoDbUrl =
    "mongodb://localhost:27017/campaign_tagging";
  }
  try {
    await createMongooseConnectionWithUrl(mongoDbUrl);
    console.log("Node app is running on port", app.get("port"));
  } catch (error) {
    console.log("MongoDB connection error: ", error);
  }
});

async function createMongooseConnectionWithUrl(mongoDbUrl) {
  await mongoose.connect(mongoDbUrl, { useNewUrlParser: true });
  mongoose.set("useCreateIndex", true);
  mongoose.Promise = global.Promise;
  var db = mongoose.connection;
}
