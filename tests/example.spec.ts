import { test, expect } from '@playwright/test';


test('has title_1', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('2 plus 3 is 5', async ({ page }) => {
  expect(2 + 3).toEqual(5);
});

/* test('has title_2', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwrights/);
});

test('has title_3', async ({ page }) => {
  await page.goto('https://www.google.com/maps/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Googole/);
});*/
