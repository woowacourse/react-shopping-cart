class UniqueIdentifier {
  #uniqueIdentifierSet: Set<string>;

  constructor() {
    this.#uniqueIdentifierSet = new Set();
  }

  add(name: string) {
    if (this.#uniqueIdentifierSet.has(name)) return;
    this.#uniqueIdentifierSet.add(name);
  }

  get(name: string) {
    return this.#uniqueIdentifierSet.has(name);
  }
}

export const uniqueIdentifier = new UniqueIdentifier();
