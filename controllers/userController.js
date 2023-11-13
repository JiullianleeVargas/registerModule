const express = require("express");
const fs = require("fs");
const user = express();
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


// Function to check if an email exists in the users array

user.use(express.json());
user.post('/register', async (req, res) => {

  //const client = new MongoClient('mongodb://localhost:27017');

  try {

      let email = req.body.email; 
      console.log(email)
      let password = req.body.password;
      console.log(password)

      email = email.trim();
      password = password.trim();

      if(email != "" && password != "")
      {
            // client.connect();
            // const database = client.db('test');
            // const usersCollection = database.collection('users');o
            const file = "./users.json";
            // const user = await usersCollection.findOne({ email });
            let data = readFrom(file)
            console.log(data)

            const isEmailRegistered = (email) => {
              return data.some(user => user.email === email);
              
            };
            
            
            console.log(isEmailRegistered(email))
            if (isEmailRegistered(email)) {
                //if user found, cookie message = username/email already exists
                res.send('Email already exists!');
                //res.cookie('message', 'Email already exists!');
            } else {
                let newUser = {
                "email": email,
                "password": password
                }

                //Append the new user to the existing data
                console.log(newUser)
                data.push(newUser);

                // Write the updated data back to the file
                writeTo(file, data, res);
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
   } //finally {
      //await client.close();
  //}

})