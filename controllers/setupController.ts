let Todos = require("../models/todoModel");
let { isLoggedIn } = require("./authorizationMiddleware");
import express, { Request, Response } from "express";
interface Todo {
  username: String;
  todo: String;
  isDone: Boolean;
  hasAttachment: Boolean;
}

interface Todos {
  todos: Todo[];
}
export default function (app: express.Application) {
  app.get("/api/setupTodos", isLoggedIn, (req: Request, res: Response) => {
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
    Todos.create(starterTodos, (err: Error, results: Todos) => {
      res.send(results);
    });
  });
}
