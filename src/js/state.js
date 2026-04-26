import { FILTERS } from "./constants.js";

export function createState() {
  return {
    todos: [],
    filter: FILTERS.ALL,
  };
}
