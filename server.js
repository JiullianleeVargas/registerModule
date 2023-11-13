const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const fs = require("fs");
const userController = require("./controllers/userController");

app.use(express.json());
app.use("/user", userController);

function writeTo(file, data) {
  fs.writeFile(file, JSON.stringify(data), "utf8", (err) => {
    throw err;
  });
}

function readFrom(file) {
  if (fs.existsSync(file)) {
    let data = fs.readFileSync(file, "utf-8");
    data = JSON.parse(data);
    return data;
  }
}


app.listen(3000, () => {
  console.log("Project is running!");
})