import { TodoList } from "./TodoList";

const todoList = new TodoList();

const activeArray: ("todo" | "favorite" | "completed" | "incomplete")[] = [];

function showAll() {
  todoList.render("todo");
}

document.addEventListener("DOMContentLoaded", () => {
  const addTodoInput = document.getElementById(
    "addTodoInput"
  ) as HTMLInputElement;
  addTodoInput.focus();

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
      todoList.addItem(addTodoInput.value, activeArray[0]);
      addTodoInput.value = "";
    }
  });

  addTodoInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && addTodoInput.value.trim() !== "") {
      todoList.addItem(addTodoInput.value, activeArray[0]);
      addTodoInput.value = "";
    }
  });

  searchInput?.addEventListener("input", () => {
    makeButtonStyleInactive();
    if (showAllButton) {
      showAllButton.style.borderBottom = "5px solid blue";
    }
    todoList.search(searchInput.value);
  });

  if (showAllButton) {
    showAllButton.style.borderBottom = "5px solid blue";
    showAllButton.addEventListener("click", () => {
      todoList.render("todo");
      activeArray.splice(0, activeArray.length);
      activeArray.push("todo");
      makeButtonStyleInactive();
      showAllButton.style.borderBottom = "5px solid blue";
    });
  }

  if (showFavoritesButton) {
    showFavoritesButton.addEventListener("click", () => {
      todoList.render("favorite");
      activeArray.splice(0, activeArray.length);
      activeArray.push("favorite");
      makeButtonStyleInactive();
      showFavoritesButton.style.borderBottom = "5px solid blue";
    });
  }

  if (showCompletedButton) {
    showCompletedButton.addEventListener("click", () => {
      todoList.render("completed");
      activeArray.splice(0, activeArray.length);
      activeArray.push("completed");
      makeButtonStyleInactive();
      showCompletedButton.style.borderBottom = "5px solid blue";
    });
  }

  if (showIncompleteButton) {
    showIncompleteButton.addEventListener("click", () => {
      todoList.render("incomplete");
      activeArray.splice(0, activeArray.length);
      activeArray.push("incomplete");
      makeButtonStyleInactive();
      showIncompleteButton.style.borderBottom = "5px solid blue";
    });
  }

  showAll();
});
