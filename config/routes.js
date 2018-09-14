const axios = require("axios");
const bcrypt = require("bcryptjs");
const db = require("../database/dbConfig.js");
const { authenticate, generateToken } = require("./middlewares");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 10);
  creds.password = hash;
  db("users")
    .insert(creds)
    .then(ids => {
      const id = ids[0];
      db("users")
        .where({ id })
        .first()
        .then(user => {
          const token = generateToken(user);
          res.status(201).json({ id: user.id, token });
        })
        .catch(err => {
          res
            .status(500)
            .json({ errMessage: "There was an error while registering" });
        });
    });
}

function login(req, res) {
  // implement user login
  const { username } = req.body;
  const { password } = req.body;
  db("users")
    .where({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ token });
      } else {
        res.status(401).json({
          message: "You shall not pass!",
        });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ errMessage: "There was an error while registering" });
    });
}

function getJokes(req, res) {
  axios
    .get(
      "https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten",
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}
