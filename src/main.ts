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

  const navButton = [
    showAllButton,
    showFavoritesButton,
    showCompletedButton,
    showIncompleteButton,
  ];

  const makeButtonStyleInactive = () => {
    navButton.forEach((button) => {
      if (button) {
        button.style.border = "none";
      }
    });
  };

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
    showAllButton.style.borderBottom = "5px solid blue";
    showAllButton.addEventListener("click", () => {
      todoList.render("todo");
      makeButtonStyleInactive();
      showAllButton.style.borderBottom = "5px solid blue";
    });
  }

  if (showFavoritesButton) {
    showFavoritesButton.addEventListener("click", () => {
      todoList.render("favorite");
      makeButtonStyleInactive();
      showFavoritesButton.style.borderBottom = "5px solid blue";
    });
  }

  if (showCompletedButton) {
    showCompletedButton.addEventListener("click", () => {
      todoList.render("completed");
      makeButtonStyleInactive();
      showCompletedButton.style.borderBottom = "5px solid blue";
    });
  }

  if (showIncompleteButton) {
    showIncompleteButton.addEventListener("click", () => {
      todoList.render("incomplete");
      makeButtonStyleInactive();
      showIncompleteButton.style.borderBottom = "5px solid blue";
    });
  }

  showAll();
});
