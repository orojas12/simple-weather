export class ContextNotFoundError extends Error {
  constructor(context: string) {
    super(
      `No matching provider in the tree was found for context: ${context}.`
    );
  }
}
