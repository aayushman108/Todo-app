export interface ITodoItem {
  id: number;
  text: string;
  completed: boolean;
  favorite: boolean;
  toggleCompletion(): void;
  toggleFavorite(): void;
}

export class TodoItem implements ITodoItem {
  id: number;
  text: string;
  completed: boolean;
  favorite: boolean;

  constructor(
    id: number,
    text: string,
    completed: boolean = false,
    favorite: boolean = false
  ) {
    this.id = id;
    this.text = text;
    this.completed = completed;
    this.favorite = favorite;
  }

  toggleCompletion(): void {
    this.completed = !this.completed;
  }

  toggleFavorite(): void {
    this.favorite = !this.favorite;
  }
}
