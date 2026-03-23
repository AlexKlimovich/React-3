export class LSService<T> {
  constructor(private readonly key: string) {}

  get(): T | null {
    const value = localStorage.getItem(this.key);
    if (value) {
      return JSON.parse(value) as T;
    }

    return null;
  }

  set(value: T) {
    localStorage.setItem(this.key, JSON.stringify(value));
  }
}
