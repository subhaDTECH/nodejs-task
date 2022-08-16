const express = require("express");
const app = express();
const axios = require("axios");

//middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//route

app.get("/todos", async (req, res) => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/todos"
  );
  const todos = [];
  for (let i = 0; i < data.length; i++) {
    todos.push({
      id: data[i].id,
      title: data[i].title,
      completed: data[i].completed,
    });
  }

  res.status(200).json({
    todos,
  });
});

// get user

app.get("/users/:id", async (req, res) => {
  const userData = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${req.params.id}`
  );

  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/todos"
  );
  const todos = [];
  for (let i = 0; i < data.length; i++) {
    todos.push({
      id: data[i].id,
      title: data[i].title,
      completed: data[i].completed,
    });
  }

  const mydata = {
    id: userData.data.id,
    name: userData.data.name,
    phone: userData.data.phone,
    todos,
  };

  res.status(200).json({
    mydata,
  });
});

//export app
module.exports = app;
