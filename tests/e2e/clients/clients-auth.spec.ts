import { test, expect } from '../fixtures/auth.fixture';

test.describe('Clients - Authenticated', () => {
  test.use({ storageState: '.auth/test-user.json' });

  test('displays clients list', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/clients');
    
    // Check for clients
    await expect(authenticatedPage.getByText('Acme Corp')).toBeVisible();
    await expect(authenticatedPage.getByText('TechStart Inc')).toBeVisible();
  });

  test('displays platform connections', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/clients');
    
    // Check for platform badges
    await expect(authenticatedPage.getByText('Google Analytics')).toBeVisible();
    await expect(authenticatedPage.getByText('Facebook Ads')).toBeVisible();
  });

  test('has add client button', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/clients');
    
    // Check for add client button
    await expect(authenticatedPage.getByRole('button', { name: /add client/i })).toBeVisible();
  });

  test('displays connect platform button', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/clients');
    
    // Check for connect platform buttons
    await expect(authenticatedPage.getByRole('button', { name: /connect platform/i }).first()).toBeVisible();
  });
});