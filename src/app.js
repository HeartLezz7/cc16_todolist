require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const todoController = require("./controllers/todoController");

app.use(cors());
app.use(express.json());

app.get("/todo", todoController.getAllTodos);
app.post("/todo", todoController.addTodo);
app.patch("/todo/update/:id", todoController.updateTodo);
app.delete("/todo/delete/:id", todoController.deleteTodo);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log("Server run on port", PORT));
