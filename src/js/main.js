import { createState } from "./state.js";
import { createTodo, clearCompleted, removeTodo, toggleTodo } from "./todoService.js";
import { loadTodos, saveTodos } from "./storage.js";
import { clearError, render, setFilter, showError } from "./ui.js";

const state = createState();

const elements = {
  form: document.querySelector("#todo-form"),
  input: document.querySelector("#todo-input"),
  error: document.querySelector("#form-error"),
  list: document.querySelector("#todo-list"),
  itemsLeft: document.querySelector("#items-left"),
  clearCompleted: document.querySelector("#clear-completed"),
  filterButtons: Array.from(document.querySelectorAll("[data-filter]")),
};

state.todos = loadTodos();
render(state, elements);

function updateAndRender(nextTodos) {
  state.todos = nextTodos;
  saveTodos(state.todos);
  render(state, elements);
}

elements.form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = elements.input.value.trim();

  if (!value) {
    showError(elements, "Task title is required.");
    return;
  }

  clearError(elements);
  updateAndRender([createTodo(value), ...state.todos]);
  elements.form.reset();
  elements.input.focus();
});

elements.list.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }

  const item = target.closest(".todo-item");
  if (!item) {
    return;
  }

  const { id } = item.dataset;
  if (!id) {
    return;
  }

  const action = target.dataset.action;
  if (action === "delete") {
    updateAndRender(removeTodo(state.todos, id));
  }
});

elements.list.addEventListener("change", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }

  if (target.dataset.action !== "toggle") {
    return;
  }

  const item = target.closest(".todo-item");
  if (!item || !item.dataset.id) {
    return;
  }

  updateAndRender(toggleTodo(state.todos, item.dataset.id));
});

elements.filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setFilter(button.dataset.filter, state);
    render(state, elements);
  });
});

elements.clearCompleted.addEventListener("click", () => {
  updateAndRender(clearCompleted(state.todos));
});
