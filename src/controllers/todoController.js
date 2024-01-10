const prisma = require("../model/prisma");

exports.getAllTodos = async (req, res) => {
  try {
    const allTodos = await prisma.todoList.findMany({
      where: { firstname: req.query.firstname, lastname: req.query.lastname },
    });
    if (allTodos.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(allTodos);
  } catch (error) {
    console.log(error);
  }
};

exports.addTodo = async (req, res) => {
  try {
    const task = await prisma.todoList.create({ data: req.body });
    res.status(201).json(task);
  } catch (error) {
    console.log(error);
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const foundTask = await prisma.todoList.findFirst({
      where: {
        id: +req.params.id,
      },
    });

    if (!foundTask) {
      return res.status(500).json("NOT FOUND TASK");
    }

    const updatedTask = await prisma.todoList.update({
      where: { id: foundTask.id },
      data: req.body,
    });

    res.status(201).json(updatedTask);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const foundTask = await prisma.todoList.findFirst({
      where: { id: +req.params.id },
    });

    if (!foundTask) {
      return res.status(500).json("NOT FOUND TODO");
    }

    const deleteItem = await prisma.todoList.delete({
      where: { id: foundTask.id },
    });

    res.status(201).json(deleteItem);
  } catch (error) {
    console.log(error);
  }
};
