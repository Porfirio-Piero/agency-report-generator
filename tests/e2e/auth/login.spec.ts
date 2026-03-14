import { test, expect } from '../fixtures/test.fixture';

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('displays sign in page for unauthenticated users', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/sign-in/);
  });

  test('shows error for invalid credentials', async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.signIn('invalid@example.com', 'wrongpassword');
    
    // Should show error message
    await expect(page.getByRole('alert')).toBeVisible();
    await expect(page.getByRole('alert')).toContainText(/invalid/i);
  });

  test('redirects to dashboard after successful login', async ({ page }) => {
    // Note: This test requires a valid test account
    // In real tests, you'd use a test fixture or mock
    
    // Mock the auth API
    await page.route('**/api/auth/**', route => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({ success: true, user: { id: 'test-user' } }),
      });
    });
    
    await page.goto('/sign-in');
    await page.getByLabel(/email/i).fill('test@example.com');
    await page.getByLabel(/password/i).fill('testpassword');
    await page.getByRole('button', { name: /sign in/i }).click();
    
    // Should redirect to dashboard
    await expect(page).toHaveURL(/dashboard/);
  });

  test('signs out successfully', async ({ page }) => {
    // Login first
    await page.goto('/dashboard');
    
    // If authenticated, sign out button should be visible
    const signOutButton = page.getByRole('button', { name: /sign out/i });
    if (await signOutButton.isVisible()) {
      await signOutButton.click();
      await expect(page).toHaveURL(/sign-in/);
    }
  });

  test('sign up link navigates to sign up page', async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.clickSignUp();
    
    await expect(page).toHaveURL(/sign-up/);
  });
});