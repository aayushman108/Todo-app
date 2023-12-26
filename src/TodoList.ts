import { TodoItem } from "./TodoItem";
import { todoNav } from "./main";

/**
 * Represents a todo list with various operations.
 * @interface
 */
export interface ITodoList {
  /**
   * Adds a new item to the todo list.
   * @param {string} text - The text of the new item.
   * @param {todoNav} type - The type of the new item (e.g., "completed", "favorite", "todo").
   * @returns {void}
   */
  addItem(text: string, type: todoNav): void;

  /**
   * Toggles the completion status of an item in the todo list.
   * @param {string} id - The ID of the item to toggle.
   * @param {todoNav} type - The type of the item (e.g., "completed", "favorite", "todo").
   * @returns {void}
   */
  toggleComplete(id: string, type: todoNav): void;

  /**
   * Toggles the favorite status of an item in the todo list.
   * @param {string} id - The ID of the item to toggle.
   * @param {todoNav} type - The type of the item (e.g., "completed", "favorite", "todo").
   * @returns {void}
   */
  toggleFavorite(id: string, type: todoNav): void;

  /**
   * Removes an item from the todo list.
   * @param {string} id - The ID of the item to remove.
   * @param {todoNav} type - The type of the item (e.g., "completed", "favorite", "todo").
   * @returns {void}
   */
  removeItem(id: string, type: todoNav): void;

  /**
   * Renders the todo list based on the specified type.
   * @param {todoNav} type - The type of the todo list to render (e.g., "completed", "favorite", "todo").
   * @returns {void}
   */
  render(type: todoNav): void;

  /**
   * Renders search results based on the provided items.
   * @param {TodoItem[]} items - The items to display as search results.
   * @returns {void}
   */
  renderSearchResults(items: TodoItem[]): void;

  /**
   * Searches for items in the todo list based on the provided query.
   * @param {string} query - The search query.
   * @returns {void}
   */
  search(query: string): void;

  /**
   * Retrieves all favorite items from the todo list.
   * @returns {TodoItem[]} - An array of favorite TodoItems.
   */
  getFavoriteItems(): TodoItem[];

  /**
   * Retrieves all completed items from the todo list.
   * @returns {TodoItem[]} - An array of completed TodoItems.
   */
  getCompletedItems(): TodoItem[];

  /**
   * Retrieves all incomplete items from the todo list.
   * @returns {TodoItem[]} - An array of incomplete TodoItems.
   */
  getIncompleteItems(): TodoItem[];

  /**
   * Saves the todo list to local storage.
   * @returns {void}
   */
  saveToLocalStorage(): void;

  /**
   * Loads the todo list from local storage.
   * @returns {void}
   */
  loadFromLocalStorage(): void;

  /**
   * Hides all todo list containers.
   * @returns {void}
   */
  display(): void;

  /**
   * Asks for confirmation before deleting an item from the todo list.
   * @param {string} id - The ID of the item to delete.
   * @param {todoNav} type - The type of the item (e.g., "completed", "favorite", "todo").
   * @returns {void}
   */
  confirmDelete(id: string, type: todoNav): void;

  // Properties of the TodoList class
  items: TodoItem[];
  filteredItems: TodoItem[];
}

/**
 * Implementation of the ITodoList interface representing a todo list.
 * @class
 * @implements {ITodoList}
 */
export class TodoList implements ITodoList {
  /**
   * The array of todo items in the list.
   * @type {TodoItem[]}
   */
  items: TodoItem[];

  /**
   * The array of filtered todo items based on search or type.
   * @type {TodoItem[]}
   */
  filteredItems: TodoItem[];

  /**
   * Constructor for the TodoList class.
   * Initializes properties and loads data from local storage.
   */
  constructor() {
    this.items = [];
    this.filteredItems = [];
    this.loadFromLocalStorage();
  }

  /**
   * Adds a new item to the todo list.
   * @param {string} text - The text of the new item.
   * @param {todoNav} type - The type of the new item (e.g., "completed", "favorite", "todo").
   * @returns {void}
   */
  addItem(text: string, type: todoNav): void {
    let newItem;
    if (type === "completed") {
      newItem = new TodoItem(text, true, false);
    } else if (type === "favorite") {
      newItem = new TodoItem(text, false, true);
    } else {
      newItem = new TodoItem(text, false, false);
    }
    this.items.unshift(newItem);
    this.saveToLocalStorage();
    this.render(type);
  }

  /**
   * Toggles the completion status of an item in the todo list.
   * @param {string} id - The ID of the item to toggle.
   * @param {todoNav} type - The type of the item (e.g., "completed", "favorite", "todo").
   * @returns {void}
   */
  toggleComplete(id: string, type: todoNav): void {
    const item = this.items.find((item) => item.id === id);
    if (item) {
      item.toggleCompletion();
      this.render(type);
      this.saveToLocalStorage();
    }
  }

  /**
   * Toggles the favorite status of an item in the todo list.
   * @param {string} id - The ID of the item to toggle.
   * @param {todoNav} type - The type of the item (e.g., "completed", "favorite", "todo").
   * @returns {void}
   */
  toggleFavorite(id: string, type: todoNav): void {
    const item = this.items.find((item) => item.id === id);
    if (item) {
      item.toggleFavorite();
      this.render(type);
      this.saveToLocalStorage();
    }
  }

  /**
   * Removes an item from the todo list.
   * @param {string} id - The ID of the item to remove.
   * @param {todoNav} type - The type of the item (e.g., "completed", "favorite", "todo").
   * @returns {void}
   */
  removeItem(id: string, type: todoNav): void {
    this.items = this.items.filter((item) => item.id !== id);
    this.render(type);
    this.saveToLocalStorage();
  }

  /**
   * Asks for confirmation before deleting an item from the todo list.
   * @param {string} id - The ID of the item to delete.
   * @param {todoNav} type - The type of the item (e.g., "completed", "favorite", "todo").
   * @returns {void}
   */
  confirmDelete(id: string, type: todoNav): void {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (isConfirmed) {
      this.removeItem(id, type);
    }
  }

  /**
   * Retrieves all favorite items from the todo list.
   * @returns {TodoItem[]} - An array of favorite TodoItems.
   */
  getFavoriteItems(): TodoItem[] {
    return this.items.filter((item) => item.favorite);
  }

  /**
   * Retrieves all completed items from the todo list.
   * @returns {TodoItem[]} - An array of completed TodoItems.
   */
  getCompletedItems(): TodoItem[] {
    return this.items.filter((item) => item.completed);
  }

  /**
   * Retrieves all incomplete items from the todo list.
   * @returns {TodoItem[]} - An array of incomplete TodoItems.
   */
  getIncompleteItems(): TodoItem[] {
    return this.items.filter((item) => !item.completed);
  }

  /**
   * Saves the todo list to local storage.
   * @returns {void}
   */
  saveToLocalStorage(): void {
    try {
      localStorage.setItem("todoItems", JSON.stringify(this.items));
    } catch (error) {
      console.error("Error saving to local storage:", error);
    }
  }

  /**
   * Loads the todo list from local storage.
   * @returns {void}
   */
  loadFromLocalStorage(): void {
    try {
      const storedItems = localStorage.getItem("todoItems");
      if (storedItems) {
        const items = JSON.parse(storedItems);

        this.items = items.map((item: TodoItem) => {
          return new TodoItem(item.text, item.completed, item.favorite);
        });
      }
    } catch (error) {
      console.error("Error loading from local storage:", error);
    }
  }

  /**
   * Hides all todo list containers.
   * @returns {void}
   */
  display(): void {
    const containers = document.getElementsByTagName("ul");
    const containerArray = Array.from(containers);
    containerArray.forEach((container) => {
      container.style.display = "none";
    });
  }

  /**
   * Searches for items in the todo list based on the provided query.
   * @param {string} query - The search query.
   * @returns {void}
   */
  search(query: string): void {
    this.display();
    const searchTerm = query.trim().toLowerCase();
    this.filteredItems = this.items.filter((item) =>
      item.text.toLowerCase().includes(searchTerm)
    );
    this.renderSearchResults(this.filteredItems);
  }

  /**
   * Renders search results based on the provided items.
   * @param {TodoItem[]} items - The items to display as search results.
   * @returns {void}
   */
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

  /**
   * Renders the todo list based on the specified type.
   * @param {todoNav} type - The type of the todo list to render (e.g., "completed", "favorite", "todo").
   * @returns {void}
   */
  render(type: todoNav = "todo"): void {
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

  /**
   * Creates an HTML list item element for a todo item.
   * @param {TodoItem} item - The todo item to create a list item for.
   * @param {todoNav} type - The type of the item (e.g., "completed", "favorite", "todo").
   * @returns {HTMLLIElement} - The created HTML list item element.
   */
  private createListItem(
    item: TodoItem,
    type: todoNav = "todo"
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
      this.confirmDelete(item.id, type)
    );
    listItem.appendChild(removeButton);

    return listItem;
  }
}
