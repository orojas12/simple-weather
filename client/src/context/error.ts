export class ContextNotFoundError extends Error {
  constructor() {
    super("No matching provider in the tree was found for this context.");
  }
}
