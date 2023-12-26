import { TodoList } from "./TodoList";

/**
 * Represents the possible navigation states for the todo list.
 * @type {"todo" | "favorite" | "completed" | "incomplete"}
 */
export type todoNav = "todo" | "favorite" | "completed" | "incomplete";

/**
 * The TodoList instance.
 * @type {TodoList}
 */
const todoList: TodoList = new TodoList();

/**
 * An array to store the active navigation states.
 * @type {todoNav[]}
 */
const activeArray: todoNav[] = [];

/**
 * Displays all todo items.
 * @returns {void}
 */
function showAll(): void {
  todoList.render("todo");
}

document.addEventListener("DOMContentLoaded", () => {
  const addTodoInput = document.getElementById(
    "addTodoInput"
  ) as HTMLInputElement;
  const searchInput = document.getElementById(
    "searchInput"
  ) as HTMLInputElement;

  const addTodoButton = document.getElementById(
    "addTodoButton"
  ) as HTMLButtonElement;
  const showAllButton = document.getElementById(
    "showAllButton"
  ) as HTMLButtonElement;
  const showFavoritesButton = document.getElementById(
    "showFavoritesButton"
  ) as HTMLButtonElement;
  const showCompletedButton = document.getElementById(
    "showCompletedButton"
  ) as HTMLButtonElement;
  const showIncompleteButton = document.getElementById(
    "showIncompleteButton"
  ) as HTMLButtonElement;

  const navButton = [
    showAllButton,
    showFavoritesButton,
    showCompletedButton,
    showIncompleteButton,
  ];

  /**
   * Styles all navigation buttons as inactive.
   * @returns {void}
   */
  const makeButtonStyleInactive = (): void => {
    navButton.forEach((button) => {
      if (button) {
        button.style.border = "none";
      }
    });
  };

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
      showAllButton.style.borderBottom = "5px solid rgb(4, 4, 150)";
    }
    todoList.search(searchInput.value);
  });

  if (showAllButton) {
    showAllButton.style.borderBottom = "5px solid rgb(4, 4, 150)";
    showAllButton.addEventListener("click", () => {
      todoList.render("todo");
      activeArray.splice(0, activeArray.length);
      activeArray.push("todo");
      makeButtonStyleInactive();
      showAllButton.style.borderBottom = "5px solid rgb(4, 4, 150)";
    });
  }

  if (showFavoritesButton) {
    showFavoritesButton.addEventListener("click", () => {
      todoList.render("favorite");
      activeArray.splice(0, activeArray.length);
      activeArray.push("favorite");
      makeButtonStyleInactive();
      showFavoritesButton.style.borderBottom = "5px solid rgb(4, 4, 150)";
    });
  }

  if (showCompletedButton) {
    showCompletedButton.addEventListener("click", () => {
      todoList.render("completed");
      activeArray.splice(0, activeArray.length);
      activeArray.push("completed");
      makeButtonStyleInactive();
      showCompletedButton.style.borderBottom = "5px solid rgb(4, 4, 150)";
    });
  }

  if (showIncompleteButton) {
    showIncompleteButton.addEventListener("click", () => {
      todoList.render("incomplete");
      activeArray.splice(0, activeArray.length);
      activeArray.push("incomplete");
      makeButtonStyleInactive();
      showIncompleteButton.style.borderBottom = "5px solid rgb(4, 4, 150)";
    });
  }

  addTodoInput.focus();
  showAll();
});
