export const localStorageMock = {
  storage: {} as Record<string, string>,
  length: 0,
  key(index: number): string | null {
    return Object.keys(this.storage)[index] || null;
  },
  getItem(key: string): string | null {
    return this.storage[key] || null;
  },
  setItem(key: string, value: string): void {
    this.storage[key] = value;
    this.length = Object.keys(this.storage).length;
  },
  removeItem(key: string): void {
    delete this.storage[key];
    this.length = Object.keys(this.storage).length;
  },
  clear(): void {
    this.storage = {};
    this.length = 0;
  },
};
