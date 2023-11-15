//Initialize server requirements, including MongoDB
const express = require("express");
const user = express();
const { MongoClient } = require('mongodb');

//Initialize requirements for bcrypt password hashing
const bcrypt = require('bcrypt');
const saltRounds = 10; // Number of salt rounds for bcrypt hashing

//Export user so our app route can import
module.exports = user;

//Function for verifying if a string is a valid email
function isEmail(email) {
  const emailChecker = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  return emailChecker.test(email);
}

//Function for password hashing using bcrypt
async function hashPassword(password) {
  try {
      // Generate a salt
      const salt = await bcrypt.genSalt(saltRounds);

      // Hash the password with the generated salt
      const hashedPassword = await bcrypt.hash(password, salt);

      return hashedPassword;
  } catch (error) {
      throw error;
  }
}


user.use(express.json());

//Register async function
user.post('/register', async (req, res) => {

  //Connect to MongoDB client
  const client = new MongoClient('mongodb://0.0.0.0:27017');

  try {

      //Receive an email and password strings
      let email = req.body.email; 
      let password = req.body.password;

      email = email.trim();
      password = password.trim();

      //Hash the password
      password = hashPassword(password);

      //Check that input fields both contain data
      if(email != "" && password != "") 
      {
        //Send an error message if email isn't in valid format
        if(!isEmail(email)) {
            res.send("Invalid email input!");
        }

          //Connect to DB named 'database_name' and collection named 'collection_name'
          // These names are placeholders, here you will put the actual name of your database and collection
          client.connect();
          const database = client.db('database_name');
          const usersCollection = database.collection('collection_name');

          //Find query for that specific user given the email
          const user = await usersCollection.findOne({ email });

          //If user exists, send an error message
          if (user) {
              res.send('Email already exists!');
          } else 
          {
            //If user doesn't exist, create that user in the DB's users collection
            const user = 
            {
                email: email,
                password: password
            };
    
              await usersCollection.insertOne(user);
              res.send('Account created!');
          }
      }
      //Send an error if either input field is empty
      else {
          res.send('Email and password cannot be empty!');
      }
  } 
  //Catch any other errors
  catch (err) {
    res.send(err);
  } 
  //Close MongoDB client at end
  finally {
    await client.close();
  }
  
})

