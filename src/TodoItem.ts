export interface ITodoItem {
  id: number;
  text: string;
  completed: boolean;
  toggleCompletion(): void;
}

export class TodoItem implements ITodoItem {
  id: number;
  text: string;
  completed: boolean;

  constructor(id: number, text: string, completed: boolean = false) {
    this.id = id;
    this.text = text;
    this.completed = completed;
  }

  toggleCompletion(): void {
    this.completed = !this.completed;
  }
}
