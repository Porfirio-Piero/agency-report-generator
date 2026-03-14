import { test, expect } from '../fixtures/auth.fixture';

test.describe('Reports - Authenticated', () => {
  test.use({ storageState: '.auth/test-user.json' });

  test('displays reports list', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/reports');
    
    // Check for reports
    await expect(authenticatedPage.getByText('Acme Corp')).toBeVisible();
  });

  test('displays report metrics', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/reports');
    
    // Check for metrics cards
    await expect(authenticatedPage.getByText(/impressions/i)).toBeVisible();
    await expect(authenticatedPage.getByText(/clicks/i)).toBeVisible();
    await expect(authenticatedPage.getByText(/conversions/i)).toBeVisible();
    await expect(authenticatedPage.getByText(/spend/i)).toBeVisible();
  });

  test('has action buttons for reports', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/reports');
    
    // Check for action buttons
    await expect(authenticatedPage.getByRole('button', { name: /preview/i })).toBeVisible();
    await expect(authenticatedPage.getByRole('button', { name: /download/i })).toBeVisible();
  });
});