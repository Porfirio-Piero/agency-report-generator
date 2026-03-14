import { test, expect } from '../fixtures/auth.fixture';

test.describe('Settings - Authenticated', () => {
  test.use({ storageState: '.auth/test-user.json' });

  test('displays agency settings', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/settings');
    
    // Check for agency settings section
    await expect(authenticatedPage.getByRole('heading', { name: /agency settings/i })).toBeVisible();
    await expect(authenticatedPage.getByLabel(/agency name/i)).toBeVisible();
  });

  test('displays delivery settings', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/settings');
    
    // Check for delivery settings
    await expect(authenticatedPage.getByText(/delivery settings/i)).toBeVisible();
    await expect(authenticatedPage.getByLabel(/delivery day/i)).toBeVisible();
    await expect(authenticatedPage.getByLabel(/delivery time/i)).toBeVisible();
  });

  test('displays platform connections', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/settings');
    
    // Check for platform connections
    await expect(authenticatedPage.getByText(/google analytics/i)).toBeVisible();
    await expect(authenticatedPage.getByText(/facebook ads/i)).toBeVisible();
    await expect(authenticatedPage.getByText(/linkedin ads/i)).toBeVisible();
  });

  test('has save button', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/settings');
    
    // Check for save button
    await expect(authenticatedPage.getByRole('button', { name: /save/i })).toBeVisible();
  });
});