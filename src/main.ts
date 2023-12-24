import { TodoList } from "./TodoList";

const todoList = new TodoList();

function showAll() {
  todoList.render();
  toggleVisibility("todoList", true);
  toggleVisibility("favoriteList", false);
  toggleVisibility("completedList", false);
  toggleVisibility("incompleteList", false);
  console.log("all");
}

function showFavorites() {
  console.log("favourites");
  todoList.renderFavorites();
  toggleVisibility("todoList", false);
  toggleVisibility("favoriteList", true);
  toggleVisibility("completedList", false);
  toggleVisibility("incompleteList", false);
}

function showCompleted() {
  todoList.renderCompleted();
  toggleVisibility("todoList", false);
  toggleVisibility("favoriteList", false);
  toggleVisibility("completedList", true);
  toggleVisibility("incompleteList", false);
  console.log("completed");
}

function showIncomplete() {
  todoList.renderIncomplete();
  toggleVisibility("todoList", false);
  toggleVisibility("favoriteList", false);
  toggleVisibility("completedList", false);
  toggleVisibility("incompleteList", true);
  console.log("Incomplete");
}

function toggleVisibility(elementId: string, isVisible: boolean) {
  const element = document.getElementById(elementId);
  if (element) {
    element.style.display = isVisible ? "block" : "none";
  }
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

  addTodoButton?.addEventListener("click", () => {
    if (addTodoInput.value.trim() !== "") {
      todoList.addItem(addTodoInput.value);
      addTodoInput.value = "";
    }
  });

  if (showAllButton) {
    showAllButton.addEventListener("click", showAll);
  }

  if (showFavoritesButton) {
    showFavoritesButton.addEventListener("click", showFavorites);
  }

  if (showCompletedButton) {
    showCompletedButton.addEventListener("click", showCompleted);
  }

  if (showIncompleteButton) {
    showIncompleteButton.addEventListener("click", showIncomplete);
  }

  showAll();
});
