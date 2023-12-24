import { TodoItem } from "./TodoItem";

export interface ITodoList {
  addItem(text: string): void;
  toggleItem(id: number): void;
  toggleFavorite(id: number): void;
  removeItem(id: number): void;
  render(type: "todo" | "favorite" | "completed" | "incomplete"): void;
  getFavoriteItems(): TodoItem[];
  getCompletedItems(): TodoItem[];
  getIncompleteItems(): TodoItem[];
  items: TodoItem[];
}

export class TodoList implements ITodoList {
  items: TodoItem[];

  constructor() {
    this.items = [];
  }

  addItem(text: string): void {
    const newItem = new TodoItem(this.items.length + 1, text, false);
    this.items.unshift(newItem);
    this.render();
  }

  toggleItem(id: number): void {
    const item = this.items.find((item) => item.id === id);
    if (item) {
      item.toggleCompletion();
      this.render();
    }
  }

  toggleFavorite(id: number): void {
    const item = this.items.find((item) => item.id === id);
    if (item) {
      item.toggleFavorite();
      this.render();
    }
  }

  removeItem(id: number): void {
    this.items = this.items.filter((item) => item.id !== id);
    this.render();
  }

  getFavoriteItems(): TodoItem[] {
    return this.items.filter((item) => item.favorite);
  }

  getCompletedItems(): TodoItem[] {
    return this.items.filter((item) => item.completed);
  }

  getIncompleteItems(): TodoItem[] {
    return this.items.filter((item) => !item.completed);
  }

  render(
    type: "todo" | "favorite" | "completed" | "incomplete" = "todo"
  ): void {
    const containerId = `${type}List`;
    const container = document.getElementById(containerId);

    if (container) {
      container.innerHTML = "";

      const itemsToRender =
        type === "favorite"
          ? this.getFavoriteItems()
          : type === "completed"
          ? this.getCompletedItems()
          : type === "incomplete"
          ? this.getIncompleteItems()
          : this.items;

      itemsToRender.forEach((item) => {
        const listItem = this.createListItem(item);
        container.appendChild(listItem);
      });
    }
  }

  private createListItem(item: TodoItem): HTMLLIElement {
    const listItem = document.createElement("li");

    const toggleButton = document.createElement("button");
    const iconElementComplete = document.createElement("i");
    iconElementComplete.classList.add(
      "bi",
      item.completed ? "bi-check-circle-fill" : "bi-circle"
    );
    toggleButton.appendChild(iconElementComplete);
    toggleButton.addEventListener("click", () => this.toggleItem(item.id));
    listItem.appendChild(toggleButton);

    const textElement = document.createElement("span");
    textElement.textContent = item.text;
    listItem.className = item.completed ? "completed" : "";
    listItem.appendChild(textElement);

    const favoriteButton = document.createElement("button");
    const iconElementFavorite = document.createElement("i");
    iconElementFavorite.classList.add(
      "bi",
      item.favorite ? "bi-star-fill" : "bi-star"
    );
    favoriteButton.appendChild(iconElementFavorite);
    favoriteButton.addEventListener("click", () =>
      this.toggleFavorite(item.id)
    );
    listItem.appendChild(favoriteButton);

    const removeButton = document.createElement("button");
    const iconElementDelete = document.createElement("i");
    iconElementDelete.classList.add("bi", "bi-trash");
    removeButton.appendChild(iconElementDelete);
    removeButton.addEventListener("click", () => this.removeItem(item.id));
    listItem.appendChild(removeButton);

    return listItem;
  }
}
