const { test, expect } = require("@playwright/test");

test.describe("Mobile To-Do app", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test("adds a new todo item", async ({ page }) => {
    await page.getByPlaceholder("Add a task...").fill("Write Playwright tests");
    await page.getByRole("button", { name: "Add" }).click();

    await expect(page.getByText("Write Playwright tests")).toBeVisible();
    await expect(page.locator("#items-left")).toHaveText("1 item left");
  });

  test("toggles a todo item completed and filters", async ({ page }) => {
    await page.getByPlaceholder("Add a task...").fill("Task A");
    await page.getByRole("button", { name: "Add" }).click();
    await page.getByPlaceholder("Add a task...").fill("Task B");
    await page.getByRole("button", { name: "Add" }).click();

    const taskARow = page.locator(".todo-item", { hasText: "Task A" });
    await taskARow.locator('[data-action="toggle"]').check();

    await page.getByRole("button", { name: "Active" }).click();
    await expect(page.getByText("Task B")).toBeVisible();
    await expect(page.getByText("Task A")).not.toBeVisible();

    await page.getByRole("button", { name: "Completed" }).click();
    await expect(page.getByText("Task A")).toBeVisible();
    await expect(page.getByText("Task B")).not.toBeVisible();
  });

  test("deletes an item and clears completed", async ({ page }) => {
    await page.getByPlaceholder("Add a task...").fill("Task to delete");
    await page.getByRole("button", { name: "Add" }).click();
    await page.getByPlaceholder("Add a task...").fill("Task to complete");
    await page.getByRole("button", { name: "Add" }).click();

    const taskToDeleteRow = page.locator(".todo-item", { hasText: "Task to delete" });
    await taskToDeleteRow.locator('[data-action="delete"]').click();
    await expect(page.getByText("Task to delete")).not.toBeVisible();

    const taskToCompleteRow = page.locator(".todo-item", { hasText: "Task to complete" });
    await taskToCompleteRow.locator('[data-action="toggle"]').check();
    await page.getByRole("button", { name: "Clear completed" }).click();

    await expect(page.getByText("Task to complete")).not.toBeVisible();
    await expect(page.locator(".empty-state")).toBeVisible();
  });

  test("persists todos after page reload", async ({ page }) => {
    await page.getByPlaceholder("Add a task...").fill("Persist me");
    await page.getByRole("button", { name: "Add" }).click();

    await page.reload();

    await expect(page.getByText("Persist me")).toBeVisible();
    await expect(page.locator("#items-left")).toHaveText("1 item left");
  });
});
