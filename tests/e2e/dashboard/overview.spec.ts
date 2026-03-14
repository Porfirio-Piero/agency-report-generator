import { test, expect } from '../fixtures/test.fixture';

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Mock authentication
    await page.route('**/api/auth/**', route => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({ userId: 'test-user' }),
      });
    });
  });

  test('displays dashboard with stats', async ({ dashboardPage, page }) => {
    // Mock clients API
    await page.route('**/api/clients', route => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          clients: [
            { id: '1', name: 'Test Client', email: 'test@example.com' },
          ],
        }),
      });
    });

    await dashboardPage.goto();
    await dashboardPage.expectLoaded();
    
    // Verify stats are visible
    await expect(dashboardPage.activeClientsStat).toBeVisible();
    await expect(dashboardPage.reportsThisWeekStat).toBeVisible();
    await expect(dashboardPage.timeSavedStat).toBeVisible();
    await expect(dashboardPage.deliveredStat).toBeVisible();
  });

  test('displays recent reports table', async ({ dashboardPage, page }) => {
    // Mock reports API
    await page.route('**/api/reports', route => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          reports: [
            {
              id: '1',
              client: 'Acme Corp',
              week: 'Mar 8-14, 2026',
              status: 'sent',
              metrics: { impressions: '100000', clicks: '5000' },
            },
          ],
        }),
      });
    });

    await dashboardPage.goto();
    
    // Verify reports table is visible
    await expect(page.getByRole('table')).toBeVisible();
    await expect(page.getByText('Acme Corp')).toBeVisible();
  });

  test('navigates to clients page', async ({ dashboardPage, page }) => {
    await dashboardPage.goto();
    
    // Click clients nav link
    await page.getByRole('link', { name: /clients/i }).click();
    
    await expect(page).toHaveURL(/clients/);
  });

  test('navigates to reports page', async ({ dashboardPage, page }) => {
    await dashboardPage.goto();
    
    // Click reports nav link
    await page.getByRole('link', { name: /reports/i }).click();
    
    await expect(page).toHaveURL(/reports/);
  });

  test('navigates to settings page', async ({ dashboardPage, page }) => {
    await dashboardPage.goto();
    
    // Click settings nav link
    await page.getByRole('link', { name: /settings/i }).click();
    
    await expect(page).toHaveURL(/settings/);
  });

  test('quick action: add client button works', async ({ dashboardPage, page }) => {
    await dashboardPage.goto();
    
    await dashboardPage.clickAddClient();
    
    await expect(page).toHaveURL(/clients/);
  });
});