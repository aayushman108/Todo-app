import { ID_LENGTH } from "./constants";
import { getRandomString } from "./utils";

/**
 * Represents the structure of a Todo Item.
 * @interface
 */
export interface ITodoItem {
  /**
   * The unique identifier of the todo item.
   * @type {number}
   */
  id: string;

  /**
   * The text content of the todo item.
   * @type {string}
   */
  text: string;

  /**
   * The completion status of the todo item.
   * @type {boolean}
   */
  completed: boolean;

  /**
   * The favorite status of the todo item.
   * @type {boolean}
   */
  favorite: boolean;

  /**
   * Toggles the completion status of the todo item.
   * @returns {void}
   */
  toggleCompletion(): void;

  /**
   * Toggles the favorite status of the todo item.
   * @returns {void}
   */
  toggleFavorite(): void;
}

/**
 * Represents a Todo Item with its properties and operations.
 * @class
 * @implements {ITodoItem}
 */
export class TodoItem implements ITodoItem {
  id: string;
  text: string;
  completed: boolean;
  favorite: boolean;

  /**
   * Constructor for the TodoItem class.
   * @param {string} id - The unique identifier of the todo item.
   * @param {string} text - The text content of the todo item.
   * @param {boolean} completed - The completion status of the todo item. Default is false.
   * @param {boolean} favorite - The favorite status of the todo item. Default is false.
   */
  constructor(
    text: string,
    completed: boolean = false,
    favorite: boolean = false
  ) {
    this.id = getRandomString(ID_LENGTH);
    this.text = text;
    this.completed = completed;
    this.favorite = favorite;
  }

  /**
   * Toggles the completion status of the todo item.
   * @returns {void}
   */
  toggleCompletion(): void {
    this.completed = !this.completed;
  }

  /**
   * Toggles the favorite status of the todo item.
   * @returns {void}
   */
  toggleFavorite(): void {
    this.favorite = !this.favorite;
  }
}
