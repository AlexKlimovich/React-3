export class LSService<T> {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  get(): T | null {
    try {
      const item = localStorage.getItem(this.key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  }

  set(data: T): void {
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  remove(): void {
    localStorage.removeItem(this.key);
  }

  clear(): void {
    localStorage.clear();
  }
}
