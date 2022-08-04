let Todos = require("../models/todoModel");
let { isLoggedIn } = require("./authorizationMiddleware");
module.exports = function (app) {
  app.get("/api/setupTodos", isLoggedIn, (req, res) => {
    let starterTodos = [
      {
        username: "test",
        todo: "buy milk",
        isDone: false,
        hasAttachment: false,
      },
      {
        username: "test1",
        todo: "buy bread",
        isDone: false,
        hasAttachment: false,
      },
      {
        username: "test2",
        todo: "buy ham",
        isDone: false,
        hasAttachment: false,
      },
    ];
    Todos.create(starterTodos, (err, results) => {
      res.send(results);
    });
  });
};
