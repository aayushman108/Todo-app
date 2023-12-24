import { TodoList } from "./TodoList";

const todoList = new TodoList();

function showAll() {
  todoList.render("todo");
}

document.addEventListener("DOMContentLoaded", () => {
  const addTodoInput = document.getElementById(
    "addTodoInput"
  ) as HTMLInputElement;

  const addTodoButton = document.getElementById("addTodoButton");
  const showAllButton = document.getElementById("showAllButton");
  const showFavoritesButton = document.getElementById("showFavoritesButton");
  const showCompletedButton = document.getElementById("showCompletedButton");
  const showIncompleteButton = document.getElementById("showIncompleteButton");

  const searchInput = document.getElementById(
    "searchInput"
  ) as HTMLInputElement;

  addTodoButton?.addEventListener("click", () => {
    if (addTodoInput.value.trim() !== "") {
      todoList.addItem(addTodoInput.value);
      addTodoInput.value = "";
    }
  });

  addTodoInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && addTodoInput.value.trim() !== "") {
      todoList.addItem(addTodoInput.value);
      addTodoInput.value = "";
    }
  });

  searchInput?.addEventListener("input", () => {
    todoList.search(searchInput.value);
  });

  if (showAllButton) {
    showAllButton.addEventListener("click", () => todoList.render("todo"));
  }

  if (showFavoritesButton) {
    showFavoritesButton.addEventListener("click", () =>
      todoList.render("favorite")
    );
  }

  if (showCompletedButton) {
    showCompletedButton.addEventListener("click", () =>
      todoList.render("completed")
    );
  }

  if (showIncompleteButton) {
    showIncompleteButton.addEventListener("click", () =>
      todoList.render("incomplete")
    );
  }

  showAll();
});
