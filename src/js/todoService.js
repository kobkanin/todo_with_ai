function generateId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function createTodo(title) {
  return {
    id: generateId(),
    title: title.trim(),
    completed: false,
    createdAt: Date.now(),
  };
}

export function toggleTodo(todos, id) {
  return todos.map((todo) => {
    if (todo.id !== id) {
      return todo;
    }

    return { ...todo, completed: !todo.completed };
  });
}

export function removeTodo(todos, id) {
  return todos.filter((todo) => todo.id !== id);
}

export function clearCompleted(todos) {
  return todos.filter((todo) => !todo.completed);
}

export function getFilteredTodos(todos, filter) {
  if (filter === "active") {
    return todos.filter((todo) => !todo.completed);
  }

  if (filter === "completed") {
    return todos.filter((todo) => todo.completed);
  }

  return todos;
}

export function countActiveTodos(todos) {
  return todos.reduce((count, todo) => count + Number(!todo.completed), 0);
}
