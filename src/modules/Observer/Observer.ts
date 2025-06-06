export default class Observer {
  #listeners = new Set<() => void>();

  add(listener: () => void) {
    this.#listeners.add(listener);
  }

  remove(listener: () => void) {
    this.#listeners.delete(listener);
  }

  notify() {
    this.#listeners.forEach((listener) => listener());
  }
}
