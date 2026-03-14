import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test('displays hero section with headline', async ({ page }) => {
    await page.goto('/');
    
    // Check for hero headline
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/monday morning/i);
  });

  test('displays call to action buttons', async ({ page }) => {
    await page.goto('/');
    
    // Check for CTA buttons
    await expect(page.getByRole('button', { name: /start free trial/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /watch demo/i })).toBeVisible();
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
    
    // Check for pricing tiers
    await expect(page.getByText(/starter/i)).toBeVisible();
    await expect(page.getByText(/agency/i)).toBeVisible();
    await expect(page.getByText(/enterprise/i)).toBeVisible();
  });

  test('displays navigation', async ({ page }) => {
    await page.goto('/');
    
    // Check for navigation
    await expect(page.getByRole('link', { name: /features/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /pricing/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /testimonials/i })).toBeVisible();
  });

  test('has sign in link', async ({ page }) => {
    await page.goto('/');
    
    // Check for sign in link
    await expect(page.getByRole('link', { name: /sign in/i })).toBeVisible();
  });

  test('responsive design - mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Check that hero is still visible
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    
    // Check that CTA is visible
    await expect(page.getByRole('button', { name: /start free trial/i })).toBeVisible();
  });
});