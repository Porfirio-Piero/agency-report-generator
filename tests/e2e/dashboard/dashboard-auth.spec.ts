import { test, expect } from '../fixtures/auth.fixture';

test.describe('Dashboard - Authenticated', () => {
  test.use({ storageState: '.auth/test-user.json' });

  test('displays dashboard with stats after login', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/dashboard');
    
    // Check for stats
    await expect(authenticatedPage.getByText(/active clients/i)).toBeVisible();
    await expect(authenticatedPage.getByText(/reports this week/i)).toBeVisible();
    await expect(authenticatedPage.getByText(/time saved/i)).toBeVisible();
  });

  test('displays recent reports table', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/dashboard');
    
    // Check for reports table
    await expect(authenticatedPage.getByRole('table')).toBeVisible();
    await expect(authenticatedPage.getByText('Acme Corp')).toBeVisible();
  });

  test('navigates to clients page', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/dashboard');
    
    // Click clients link
    await authenticatedPage.getByRole('link', { name: /clients/i }).click();
    
    await expect(authenticatedPage).toHaveURL(/clients/);
  });

  test('navigates to reports page', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/dashboard');
    
    // Click reports link
    await authenticatedPage.getByRole('link', { name: /reports/i }).click();
    
    await expect(authenticatedPage).toHaveURL(/reports/);
  });

  test('navigates to settings page', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/dashboard');
    
    // Click settings link
    await authenticatedPage.getByRole('link', { name: /settings/i }).click();
    
    await expect(authenticatedPage).toHaveURL(/settings/);
  });
});