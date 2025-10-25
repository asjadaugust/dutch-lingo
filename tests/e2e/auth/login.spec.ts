import { test, expect } from '@playwright/test';

test.describe('User Login - E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('should display login form with all elements', async ({ page }) => {
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /login|sign in/i })).toBeVisible();
  });

  test('should show error for invalid email format', async ({ page }) => {
    await page.getByLabel(/email/i).fill('notanemail');
    await page.getByLabel(/password/i).fill('Test123!');
    await page.getByRole('button', { name: /login|sign in/i }).click();
    await expect(page.getByText(/valid email/i)).toBeVisible();
  });

  test('should show error for empty fields', async ({ page }) => {
    await page.getByRole('button', { name: /login|sign in/i }).click();
    await expect(page.getByText(/email.*required/i)).toBeVisible();
    await expect(page.getByText(/password.*required/i)).toBeVisible();
  });

  test('should mask password input', async ({ page }) => {
    const passwordInput = page.getByLabel(/password/i);
    await expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('should redirect to home after successful login', async ({ page }) => {
    await page.getByLabel(/email/i).fill('test@example.com');
    await page.getByLabel(/password/i).fill('Test123!');
    await page.getByRole('button', { name: /login|sign in/i }).click();
    await page.waitForURL(/\/(home|dashboard)/, { timeout: 5000 });
    expect(page.url()).toMatch(/\/(home|dashboard)/);
  });
});
