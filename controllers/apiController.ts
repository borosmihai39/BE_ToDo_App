import { Todos } from "../models/todoModel";
import ContactMessages from "../models/messageModel";
import User from "../models/user";
import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { SaveOptions } from "mongoose";

let { isLoggedIn } = require("./authorizationMiddleware");

interface TodoInterface {
  username: String;
  todo: String;
  isDone: Boolean;
  hasAttachment: Boolean;
}

interface TodosInterface {
  todos: TodoInterface[];
}

interface UserInterface {
  username: String;
  password: String;
  todos: any;
  save: () => {};
}

export default function (app: express.Application) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  // Get To Do by username
  app.get("/api/todo/:uname", (req: Request, res: Response) => {
    console.log(req.params.uname);
    Todos.findOne(
      { username: req.params.uname },
      function (err: Error, todo: TodoInterface) {
        if (err instanceof Error) throw err;
        res.send(todo);
      }
    );
  });
  // Get To Do by id
  app.get("/api/findbyid/:id", (req: Request, res: Response) => {
    Todos.findById(
      { _id: req.params.id },
      (err: Error, todo: TodoInterface) => {
        if (err) throw err;
        res.send(todo);
      }
    );
  });
  // Show todos only if user is logged in
  app.get("/api/todos", isLoggedIn, (req: Request, res: Response) => {
    Todos.find((err: Error, todo: TodoInterface) => {
      if (err) throw err;
      res.send(todo);
    });
  });
  // Show To Dos only if user is logged in v2
  app.get("/api/v2/todos", isLoggedIn, (req: Request, res: Response) => {
    let username = req.query.username;

    User.findOne({ username: req.query.username })
      .populate("todos")
      .then((result: any) => {
        res.json(result!.todos);
      })
      .catch((error: Error) => {
        res.status(500).json({ error });
        console.log(error);
      });
  });
  // Post contact message
  app.post("/api/contactmessage", (req: Request, res: Response) => {
    const newMessage = new ContactMessages({
      message: req.body.message,
      email: req.body.email,
    }).save(function (error: any, result: any) {
      if (error instanceof Error) throw error;

      if (result) {
        res.json(result);
      }
    });
  });
  // get messages
  app.get("/api/contactmessage", (req: Request, res: Response) => {
    ContactMessages.find((err: Error, message: string) => {
      if (err) throw err;
      res.send(message);
    });
  });
  // Update or post new To Do
  app.post("/api/todo", (req: Request, res: Response) => {
    if (req.body._id) {
      Todos.findByIdAndUpdate(
        req.body._id,
        {
          todo: req.body.todo,
          isDone: req.body.isDone,
          hasAttachment: req.body.hasAttachment,
        },
        function (err: Error, todo: TodoInterface) {
          if (err) throw err;
          res.send("Success update");
        }
      );
    } else {
      const newTodo = new Todos({
        username: req.body.username,
        todo: req.body.todo,
        isDone: req.body.isDone,
        hasAttachment: req.body.hasAttachment,
      });
      newTodo
        .save()
        .then(() => {
          User.findOne(
            { username: newTodo.username },
            (err: Error, user: UserInterface) => {
              if (user) {
                user.todos.push(newTodo);
                user.save();
                res.json({ message: "Todo created!" });
              }
            }
          );
        })
        .catch((error: Error) => {
          res.status(500).json({ error });
        });
    }
  });
  // Delete a To Do
  app.delete("/api/todo", (req: Request, res: Response) => {
    Todos.findByIdAndRemove(req.body.id, function (err: Error) {
      if (err) throw err;
      res.send("Success");
    });
  });
}
