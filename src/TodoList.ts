import { TodoItem } from "./TodoItem";

export interface ITodoList {
  addItem(text: string): void;
  toggleComplete(
    id: number,
    type: "todo" | "favorite" | "completed" | "incomplete"
  ): void;
  toggleFavorite(
    id: number,
    type: "todo" | "favorite" | "completed" | "incomplete"
  ): void;
  removeItem(
    id: number,
    type: "todo" | "favorite" | "completed" | "incomplete"
  ): void;
  render(type: "todo" | "favorite" | "completed" | "incomplete"): void;
  renderSearchResults(items: TodoItem[]): void;
  getFavoriteItems(): TodoItem[];
  getCompletedItems(): TodoItem[];
  getIncompleteItems(): TodoItem[];
  saveToLocalStorage(): void;
  loadFromLocalStorage(): void;
  search(query: string): void;
  display(): void;
  items: TodoItem[];
  filteredItems: TodoItem[];
}

export class TodoList implements ITodoList {
  items: TodoItem[];
  filteredItems: TodoItem[];

  constructor() {
    this.items = [];
    this.filteredItems = [];
    this.loadFromLocalStorage();
  }

  addItem(text: string): void {
    const newItem = new TodoItem(this.items.length + 1, text, false);
    this.items.unshift(newItem);
    this.saveToLocalStorage();
    this.render();
  }

  toggleComplete(
    id: number,
    type: "todo" | "favorite" | "completed" | "incomplete"
  ): void {
    const item = this.items.find((item) => item.id === id);
    if (item) {
      console.log(item, "Hellow");
      item.toggleCompletion();
      this.render(type);
      this.saveToLocalStorage();
    }
  }

  toggleFavorite(
    id: number,
    type: "todo" | "favorite" | "completed" | "incomplete"
  ): void {
    const item = this.items.find((item) => item.id === id);
    if (item) {
      item.toggleFavorite();
      this.render(type);
      this.saveToLocalStorage();
    }
  }

  removeItem(
    id: number,
    type: "todo" | "favorite" | "completed" | "incomplete"
  ): void {
    this.items = this.items.filter((item) => item.id !== id);
    this.render(type);
    this.saveToLocalStorage();
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

  saveToLocalStorage(): void {
    try {
      localStorage.setItem("todoItems", JSON.stringify(this.items));
    } catch (error) {
      console.error("Error saving to local storage:", error);
    }
  }

  loadFromLocalStorage(): void {
    try {
      const storedItems = localStorage.getItem("todoItems");
      if (storedItems) {
        const items = JSON.parse(storedItems);

        this.items = items.map((item: TodoItem) => {
          return new TodoItem(
            item.id,
            item.text,
            item.completed,
            item.favorite
          );
        });
      }
    } catch (error) {
      console.error("Error loading from local storage:", error);
    }
  }

  display(): void {
    const containers = document.getElementsByTagName("ul");
    const containerArray = Array.from(containers);
    containerArray.forEach((container) => {
      container.style.display = "none";
    });
  }

  search(query: string): void {
    this.display();
    const searchTerm = query.trim().toLowerCase();
    this.filteredItems = this.items.filter((item) =>
      item.text.toLowerCase().includes(searchTerm)
    );
    this.renderSearchResults(this.filteredItems);
  }

  renderSearchResults(items: TodoItem[]): void {
    const searchResultsContainer = document.getElementById("searchResults");

    if (searchResultsContainer) {
      searchResultsContainer.style.display = "block";
      searchResultsContainer.innerHTML = "";

      items.forEach((item) => {
        const listItem = this.createListItem(item);
        searchResultsContainer.appendChild(listItem);
      });
    }
  }

  render(
    type: "todo" | "favorite" | "completed" | "incomplete" = "todo"
  ): void {
    this.display();
    const containerId = `${type}List`;
    const container = document.getElementById(containerId);

    if (container) {
      container.innerHTML = "";
      container.style.display = "block";

      const itemsToRender =
        type === "favorite"
          ? this.getFavoriteItems()
          : type === "completed"
          ? this.getCompletedItems()
          : type === "incomplete"
          ? this.getIncompleteItems()
          : this.items;

      itemsToRender.forEach((item) => {
        const listItem = this.createListItem(item, type);
        container.appendChild(listItem);
      });
    }
  }

  private createListItem(
    item: TodoItem,
    type: "todo" | "favorite" | "completed" | "incomplete" = "todo"
  ): HTMLLIElement {
    const listItem = document.createElement("li");

    const completeButton = document.createElement("button");
    const iconElementComplete = document.createElement("i");
    iconElementComplete.classList.add(
      "bi",
      item.completed ? "bi-check-circle-fill" : "bi-circle"
    );
    completeButton.appendChild(iconElementComplete);
    completeButton.addEventListener("click", () =>
      this.toggleComplete(item.id, type)
    );
    listItem.appendChild(completeButton);

    const textElement = document.createElement("span");
    textElement.textContent = item.text;
    listItem.className = item.completed
      ? "completed"
      : item.favorite
      ? "favorite"
      : "";
    listItem.appendChild(textElement);

    const favoriteButton = document.createElement("button");
    const iconElementFavorite = document.createElement("i");
    iconElementFavorite.classList.add(
      "bi",
      item.favorite ? "bi-star-fill" : "bi-star"
    );
    favoriteButton.appendChild(iconElementFavorite);
    favoriteButton.addEventListener("click", () =>
      this.toggleFavorite(item.id, type)
    );
    listItem.appendChild(favoriteButton);

    const removeButton = document.createElement("button");
    const iconElementDelete = document.createElement("i");
    iconElementDelete.classList.add("bi", "bi-trash");
    removeButton.appendChild(iconElementDelete);
    removeButton.addEventListener("click", () =>
      this.removeItem(item.id, type)
    );
    listItem.appendChild(removeButton);

    return listItem;
  }
}
