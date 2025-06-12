import { Listener } from "./type";

export default class Observer {
  #listeners = new Set<Listener>();

  add(listener: Listener) {
    this.#listeners.add(listener);
  }

  remove(listener: () => void) {
    this.#listeners.delete(listener);
  }

  notify() {
    this.#listeners.forEach((listener) => listener());
  }
}
