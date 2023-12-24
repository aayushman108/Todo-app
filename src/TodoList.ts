import { TodoItem } from "./TodoItem";

export interface ITodoList {
  addItem(text: string): void;
  toggleItem(id: number): void;
  removeItem(id: number): void;
  render(): void;
  items: TodoItem[];
}

export class TodoList implements ITodoList {
  items: TodoItem[];

  constructor() {
    this.items = [];
  }

  addItem(text: string): void {
    const newItem = new TodoItem(this.items.length + 1, text, false);
    this.items.push(newItem);
    this.render();
  }

  toggleItem(id: number): void {
    const item = this.items.find((item) => item.id === id);
    if (item) {
      item.toggleCompletion();
      this.render();
    }
  }

  removeItem(id: number): void {
    this.items = this.items.filter((item) => item.id !== id);
    this.render();
  }

  render(): void {
    const todoList = document.getElementById("todo-list");
    if (todoList) {
      todoList.innerHTML = "";

      this.items.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.textContent = item.text;
        listItem.className = item.completed ? "completed" : "";

        const toggleButton = document.createElement("button");
        toggleButton.textContent = item.completed ? "Undo" : "Done";
        toggleButton.addEventListener("click", () => this.toggleItem(item.id));

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => this.removeItem(item.id));

        listItem.appendChild(toggleButton);
        listItem.appendChild(removeButton);

        todoList.appendChild(listItem);
      });
    }
  }
}
