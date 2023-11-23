
//
//  Run the server:
//  $ npm start
//
//
//
//
// Routes:
//   /users     => find all users
//   /users     => create a user
//   /users/:id => find user details
//   /users/:id => delete a user
//   /users/:id => update a user
//
// Example:
// http://localhost:5000/users/

import express from "express";
import bodyParser from "body-parser";

import usersRoutes from "./routes/users.js";

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use("/users", usersRoutes);

app.get("/", (req, res) => res.send("Welcome to the Users API!"));
//app.all("*", (req, res) => res.send("You've tried reaching a route that doesn't exist."));

app.listen(PORT, () =>console.log(`Server running on port: http://localhost:${PORT}`));



// Ref:
//    https://www.youtube.com/watch?v=l8WPWK9mS5M&ab_channel=JavaScriptMastery
