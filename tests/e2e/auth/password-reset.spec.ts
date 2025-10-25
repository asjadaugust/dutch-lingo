import { test, expect } from '@playwright/test';

test.describe('Password Reset - E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/forgot-password');
  });

  test('should display password reset form', async ({ page }) => {
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /reset password|send/i })).toBeVisible();
    await expect(page.getByText(/back to.*login/i)).toBeVisible();
  });

  test('should show error for invalid email', async ({ page }) => {
    await page.getByLabel(/email/i).fill('notanemail');
    await page.getByRole('button', { name: /reset password|send/i }).click();
    await expect(page.getByText(/valid email/i)).toBeVisible();
  });

  test('should show error for empty email', async ({ page }) => {
    await page.getByRole('button', { name: /reset password|send/i }).click();
    await expect(page.getByText(/email.*required/i)).toBeVisible();
  });

  test('should show success message after submission', async ({ page }) => {
    await page.getByLabel(/email/i).fill('test@example.com');
    await page.getByRole('button', { name: /reset password|send/i }).click();
    await expect(page.getByText(/check your email|sent/i)).toBeVisible({ timeout: 5000 });
  });

  test('should navigate back to login', async ({ page }) => {
    await page.getByText(/back to.*login/i).click();
    await page.waitForURL(/\/login/, { timeout: 2000 });
  });
});
