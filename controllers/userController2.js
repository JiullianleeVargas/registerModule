const express = require("express");
const fs = require("fs");
const user = express();
const { MongoClient } = require('mongodb');

module.exports = user;

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


user.use(express.json());



user.post('/register', async (req, res) => {

  const client = new MongoClient('mongodb://localhost:27017');

  try {

      let email = req.body.email; 
      let password = req.body.password;

      email = email.trim();
      password = password.trim();

      if(email != "" && password != "")
      {
          client.connect();
          const database = client.db('task_management');
          const usersCollection = database.collection('users');

          const user = await usersCollection.findOne({ email });

          if (user) {

              //if user found, cookie message = username/email already exists
              res.send('Email already exists!');
              //res.cookie('message', 'Email already exists!');
          } else {
            const user = {
                email: email,
                password: password
            };
    
              await usersCollection.insertOne(user);
              res.send('Account created!');
          }
      }
      else
      {
          res.send('Email and password cannot be empty!');
          //res.cookie('message', 'Email and password cannot be empty!');
      }

      //res.redirect('/landingPage.html');
      

  } catch (err) {
      res.send(err);
      //console.error(err);
   } finally {
      await client.close();
  }
  
})

