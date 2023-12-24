import { TodoItem } from "./TodoItem";

export interface ITodoList {
  addItem(text: string): void;
  toggleComplete(id: number): void;
  toggleFavorite(id: number): void;
  removeItem(id: number): void;
  render(type: "todo" | "favorite" | "completed" | "incomplete"): void;
  renderSearchResults(items: TodoItem[]): void;
  getFavoriteItems(): TodoItem[];
  getCompletedItems(): TodoItem[];
  getIncompleteItems(): TodoItem[];
  saveToLocalStorage(): void;
  loadFromLocalStorage(): void;
  search(query: string): void;
  searchDropdown(query: string): void;
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

  toggleComplete(id: number): void {
    const item = this.items.find((item) => item.id === id);
    if (item) {
      item.toggleCompletion();
      this.render();
      this.saveToLocalStorage();
    }
  }

  toggleFavorite(id: number): void {
    const item = this.items.find((item) => item.id === id);
    if (item) {
      item.toggleFavorite();
      this.render();
      this.saveToLocalStorage();
    }
  }

  removeItem(id: number): void {
    this.items = this.items.filter((item) => item.id !== id);
    this.render();
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
    localStorage.setItem("todoItems", JSON.stringify(this.items));
  }

  loadFromLocalStorage(): void {
    const storedItems = localStorage.getItem("todoItems");
    if (storedItems) {
      this.items = JSON.parse(storedItems);
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

  searchDropdown(query: string): void {
    const dropdown = document.getElementById("autocompleteDropdown");
    console.log(dropdown);
    if (dropdown) {
      dropdown.innerHTML = "";
      const searchTerm = query.trim().toLowerCase();
      this.filteredItems = this.items.filter((item) =>
        item.text.toLowerCase().includes(searchTerm)
      );
      this.filteredItems.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.text;
        dropdown.appendChild(option);
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
    toggleButton.addEventListener("click", () => this.toggleComplete(item.id));
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
