const Todos = require("../models/todoModel");
const User = require("../models/User");
const bodyParser = require("body-parser");
let { isLoggedIn } = require("./authorizationMiddleware");
module.exports = function (app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  // Get To Do by username
  app.get("/api/todo/:uname", (req, res) => {
    console.log(req.params.uname);
    Todos.findOne({ username: req.params.uname }, function (err, todo) {
      if (err) throw err;
      res.send(todo);
    });
  });
  // Get To Do by id
  app.get("/api/findbyid/:id", (req, res) => {
    Todos.findById({ _id: req.params.id }, (err, todo) => {
      if (err) throw err;
      res.send(todo);
    });
  });
  // Show todos only if user is logged in
  app.get("/api/todos", isLoggedIn, (req, res) => {
    Todos.find((err, todo) => {
      if (err) throw err;
      res.send(todo);
    });
  });
  // Show To Dos only if user is logged in v2
  app.get("/api/v2/todos", isLoggedIn, (req, res) => {
    let username = req.query.username;
    console.log(username);
    User.findOne({ username: req.query.username })
      .populate("todos")
      .then((result) => {
        res.json(result.todos);
      })
      .catch((error) => {
        res.status(500).json({ error });
        console.log(error);
      });
  });
  // Update or post new To Do
  app.post("/api/todo", (req, res) => {
    if (req.body._id) {
      Todos.findByIdAndUpdate(
        req.body._id,
        {
          todo: req.body.todo,
          isDone: req.body.isDone,
          hasAttachment: req.body.hasAttachment,
        },
        function (err, todo) {
          if (err) throw err;
          res.send("Success update");
        }
      );
    } else {
      const newTodo = Todos({
        username: req.body.username,
        todo: req.body.todo,
        isDone: req.body.isDone,
        hasAttachment: req.body.hasAttachment,
      });
      newTodo
        .save()
        .then((result) => {
          User.findOne({ username: newTodo.username }, (err, user) => {
            if (user) {
              user.todos.push(newTodo);
              user.save();
              res.json({ message: "Todo created!" });
            }
          });
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    }
  });
  // Delete a To Do
  app.delete("/api/todo", (req, res) => {
    Todos.findByIdAndRemove(req.body.id, function (err) {
      if (err) throw err;
      res.send("Success");
    });
  });
};
