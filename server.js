//Install express, body-parser, node, mongodb, and bcrypt for this code

//Initialize Express and Body Parser, as well as the route we shall use
//Initialize the userController
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const userController = require("./controllers/userController");

//Connect app to user controller
app.use(express.json());
app.use("/user", userController);

//Port that app is listening to 
app.listen(3000, () => {
  console.log("Project is running!");
})




