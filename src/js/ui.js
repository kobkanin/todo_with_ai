import { FILTERS } from "./constants.js";
import { countActiveTodos, getFilteredTodos } from "./todoService.js";

function createTodoItem(todo) {
  const item = document.createElement("li");
  item.className = "todo-item";
  item.dataset.id = todo.id;
  item.dataset.completed = String(todo.completed);

  item.innerHTML = `
    <input
      class="todo-item__check"
      type="checkbox"
      ${todo.completed ? "checked" : ""}
      aria-label="Mark task as complete"
      data-action="toggle"
    />
    <span class="todo-item__title"></span>
    <button class="todo-item__delete" type="button" data-action="delete" aria-label="Delete task">
      Delete
    </button>
  `;

  const title = item.querySelector(".todo-item__title");
  title.textContent = todo.title;
  return item;
}

export function render(state, elements) {
  const { todos, filter } = state;
  const visibleTodos = getFilteredTodos(todos, filter);
  const activeCount = countActiveTodos(todos);

  elements.list.innerHTML = "";

  if (visibleTodos.length === 0) {
    const emptyState = document.createElement("li");
    emptyState.className = "empty-state";
    emptyState.textContent = "No tasks found.";
    elements.list.append(emptyState);
  } else {
    visibleTodos.forEach((todo) => {
      elements.list.append(createTodoItem(todo));
    });
  }

  elements.itemsLeft.textContent = `${activeCount} item${activeCount === 1 ? "" : "s"} left`;

  elements.filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === filter;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  const hasCompleted = todos.some((todo) => todo.completed);
  elements.clearCompleted.hidden = !hasCompleted;
}

export function setFilter(filter, state) {
  if (!Object.values(FILTERS).includes(filter)) {
    return;
  }

  state.filter = filter;
}

export function showError(elements, message) {
  elements.error.textContent = message;
}

export function clearError(elements) {
  elements.error.textContent = "";
}
