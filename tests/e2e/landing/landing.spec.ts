import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test('displays hero section with headline', async ({ page }) => {
    await page.goto('/');
    
    // Check for hero headline
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/monday morning/i);
  });

  test('displays call to action buttons', async ({ page }) => {
    await page.goto('/');
    
    // Check for CTA buttons - use .first() to handle multiple matches
    await expect(page.getByRole('button', { name: /start free trial/i }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /watch demo/i }).first()).toBeVisible();
  });

  test('displays feature cards', async ({ page }) => {
    await page.goto('/');
    
    // Check for feature cards
    await expect(page.getByText(/5-minute setup/i)).toBeVisible();
    await expect(page.getByText(/automated weekly reports/i)).toBeVisible();
    await expect(page.getByText(/all your platforms/i)).toBeVisible();
    await expect(page.getByText(/client-ready pdfs/i)).toBeVisible();
  });

  test('displays pricing section', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to pricing
    await page.getByText(/pricing/i).first().scrollIntoViewIfNeeded();
    
    // Check for pricing tiers - use more specific selectors
    await expect(page.getByRole('heading', { name: /starter/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /^agency$/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /enterprise/i })).toBeVisible();
  });

  test('displays navigation', async ({ page }) => {
    await page.goto('/');
    
    // Check for navigation links in the header section
    await expect(page.getByRole('link', { name: /features/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /pricing/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /testimonials/i })).toBeVisible();
  });

  test('has login link', async ({ page }) => {
    await page.goto('/');
    
    // Check for login link in the navigation - the text is "Login" not "Sign In"
    await expect(page.getByRole('link', { name: /login/i })).toBeVisible();
  });

  test('responsive design - mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Check that hero is still visible
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    
    // Check that CTA is visible - use .first()
    await expect(page.getByRole('button', { name: /start free trial/i }).first()).toBeVisible();
  });
});