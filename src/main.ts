import { TodoList } from "./TodoList";

const todoList = new TodoList();

document.addEventListener("DOMContentLoaded", () => {
  const addTodoInput = document.getElementById(
    "addTodoInput"
  ) as HTMLInputElement;
  const addTodoButton = document.getElementById("addTodoButton");

  addTodoButton?.addEventListener("click", () => {
    if (addTodoInput.value.trim() !== "") {
      console.log("Hellow world");
      todoList.addItem(addTodoInput.value);
      addTodoInput.value = "";
    }
  });
});
