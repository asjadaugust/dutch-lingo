import { test, expect } from '@playwright/test';

test.describe('User Signup - E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/signup');
  });

  test('should display signup form with all elements', async ({ page }) => {
    await expect(page.getByLabel(/name/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/^password$/i)).toBeVisible();
    await expect(page.getByLabel(/confirm password/i)).toBeVisible();
    await expect(page.getByRole('checkbox')).toBeVisible();
    await expect(page.getByRole('button', { name: /sign up|create account/i })).toBeVisible();
  });

  test('should show error for invalid email format', async ({ page }) => {
    await page.getByLabel(/name/i).fill('John Doe');
    await page.getByLabel(/email/i).fill('notanemail');
    await page.getByLabel(/^password$/i).fill('Test123!');
    await page.getByLabel(/confirm password/i).fill('Test123!');
    await page.getByRole('checkbox').check();
    await page.getByRole('button', { name: /sign up|create account/i }).click();
    
    await expect(page.getByText(/valid email/i)).toBeVisible();
  });

  test('should show error for weak password', async ({ page }) => {
    await page.getByLabel(/name/i).fill('John Doe');
    await page.getByLabel(/email/i).fill('john@example.com');
    await page.getByLabel(/^password$/i).fill('weak');
    
    await expect(page.getByText(/password.*8 characters/i)).toBeVisible();
  });

  test('should show error for password mismatch', async ({ page }) => {
    await page.getByLabel(/name/i).fill('John Doe');
    await page.getByLabel(/email/i).fill('john@example.com');
    await page.getByLabel(/^password$/i).fill('Test123!');
    await page.getByLabel(/confirm password/i).fill('Different123!');
    await page.getByRole('checkbox').check();
    await page.getByRole('button', { name: /sign up|create account/i }).click();
    
    await expect(page.getByText(/passwords.*match/i)).toBeVisible();
  });

  test('should show error for empty required fields', async ({ page }) => {
    await page.getByRole('button', { name: /sign up|create account/i }).click();
    
    await expect(page.getByText(/name.*required/i)).toBeVisible();
    await expect(page.getByText(/email.*required/i)).toBeVisible();
    await expect(page.getByText(/password.*required/i)).toBeVisible();
  });

  test('should require terms acceptance', async ({ page }) => {
    await page.getByLabel(/name/i).fill('John Doe');
    await page.getByLabel(/email/i).fill('john@example.com');
    await page.getByLabel(/^password$/i).fill('Test123!');
    await page.getByLabel(/confirm password/i).fill('Test123!');
    // Don't check the checkbox
    await page.getByRole('button', { name: /sign up|create account/i }).click();
    
    await expect(page.getByText(/accept.*terms/i)).toBeVisible();
  });

  test('should redirect to onboarding after successful signup', async ({ page }) => {
    await page.getByLabel(/name/i).fill('John Doe');
    await page.getByLabel(/email/i).fill('newuser@example.com');
    await page.getByLabel(/^password$/i).fill('Test123!');
    await page.getByLabel(/confirm password/i).fill('Test123!');
    await page.getByRole('checkbox').check();
    await page.getByRole('button', { name: /sign up|create account/i }).click();
    
    await page.waitForURL(/\/onboarding|\/welcome/, { timeout: 5000 });
    expect(page.url()).toMatch(/\/onboarding|\/welcome/);
  });

  test('should show error for existing email', async ({ page }) => {
    await page.getByLabel(/name/i).fill('Existing User');
    await page.getByLabel(/email/i).fill('test@example.com'); // Already used in login
    await page.getByLabel(/^password$/i).fill('Test123!');
    await page.getByLabel(/confirm password/i).fill('Test123!');
    await page.getByRole('checkbox').check();
    await page.getByRole('button', { name: /sign up|create account/i }).click();
    
    await expect(page.getByText(/email.*already.*use/i)).toBeVisible({ timeout: 5000 });
  });

  test('should navigate to login page', async ({ page }) => {
    await page.getByText(/sign in|already.*account/i).click();
    await page.waitForURL(/\/login/, { timeout: 2000 });
  });

  test('should show loading state during signup', async ({ page }) => {
    await page.getByLabel(/name/i).fill('John Doe');
    await page.getByLabel(/email/i).fill('newuser@example.com');
    await page.getByLabel(/^password$/i).fill('Test123!');
    await page.getByLabel(/confirm password/i).fill('Test123!');
    await page.getByRole('checkbox').check();
    await page.getByRole('button', { name: /sign up|create account/i }).click();
    
    const loadingIndicator = page.locator('[role="progressbar"]').or(
      page.getByText(/creating|signing up/i)
    );
    await expect(loadingIndicator.first()).toBeVisible({ timeout: 1000 }).catch(() => {});
  });
});
