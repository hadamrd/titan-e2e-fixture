/** Domain logic for the Titan e2e sample frontend. */
export function greet(name?: string): string {
  if (!name || name.trim() === "") {
    return "Hello, world!";
  }
  return `Hello, ${name.trim()}!`;
}
