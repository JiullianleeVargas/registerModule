# Register Module

## Description
This Node.js code defines an Express server to handle user registration by connecting to a MongoDB database. It utilizes the bcrypt library for password hashing and employs a simple email validation function. 
- The "/register" endpoint receives email and password data from the client, trims and validates the input, hashes the password securely using bcrypt, and then  it connects it to a MongoDB database.
- It checks if the provided email is in a valid format and if it already exists in the database; if so, it returns an error message. If the email is valid and not present in the database, it inserts the user data into the MongoDB collection and sends a success message.
- The code is structured using asynchronous functions and employs the MongoClient to interact with the MongoDB database, handling errors and closing the database connection afterward.

Note that some details like the actual database and collection names are marked as placeholders and need to be replaced with the correct values. 

### Why did we decide to share this piece of code?
We decided to implement and share this code because it provides a starting point for a secure user registration implementation using Node.js, Express.js and MongoDB. This is a reusable code that can be adapted into various projects. 

## How to use this code
First of all, download the code. Make sure you have the following intstalled
- [MongoDB](https://www.mongodb.com/try/download/community)
- [MongoDBCompass](https://www.mongodb.com/products/tools/compass)
- [Mongo shell](https://www.mongodb.com/try/download/shell)
- [Postman](https://www.postman.com/downloads/)

### Activating MongoDB
Now, go to the localization of where MongoDB is installed in your computer and open in terminal. You can also navigate to it using the command prompt.
This is an example using Windows. 
```
C:\Program Files\MongoDB\Server\7.0\bin
```
Once you are in that localization, type `mongosh` . This should activate mongodb 

### Let's run the code
Open the terminal in your IDE to download the necesary packages.

Run these commands in case you don't have `node`, `express` or `bcrypt` installed (bcrypt is for the password encryption)

```
npm install node
npm install express
npm install bcrypt
```

Before running the server make sure you have created a database and collection in MongoDBCompass and replace the placeholder names in the code.
( Lines 67, 68 in the file `userController.js`).
Run the server in the IDE terminal using the following command.
```
node server.js
```
Send a POST request in Postman to `http://localhost:3000/user/register` in JSON format. The format should look something like this:
```
{
    "email": "valid_email@hotmail.com",
    "password": "some_password"
}

```
