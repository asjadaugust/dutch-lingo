import { test, expect } from '@playwright/test';

test.describe('Dutch Lingo App - Initial Setup', () => {
  test('should display welcome page', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.getByRole('heading', { name: /Dutch Lingo/i })).toBeVisible();
    await expect(page.getByText(/Setup complete/i)).toBeVisible();
  });
});
