import { test as base, Page } from '@playwright/test';

// Mock auth state for testing
export const test = base.extend<{
  authenticatedPage: Page;
}>({
  authenticatedPage: async ({ page }, use) => {
    // Mock Clerk auth
    await page.route('**/api/auth/**', route => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({ userId: 'test-user', sessionId: 'test-session' }),
      });
    });

    // Mock user data
    await page.route('**/api/users/**', route => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          id: 'test-user',
          email: 'test@example.com',
          name: 'Test User',
        }),
      });
    });

    // Mock clients API
    await page.route('**/api/clients', route => {
      if (route.request().method() === 'GET') {
        route.fulfill({
          status: 200,
          body: JSON.stringify({
            clients: [
              {
                id: '1',
                name: 'Acme Corp',
                email: 'acme@example.com',
                platforms: ['Google Analytics', 'Facebook Ads'],
                status: 'active',
              },
              {
                id: '2',
                name: 'TechStart Inc',
                email: 'tech@example.com',
                platforms: ['Google Analytics'],
                status: 'active',
              },
            ],
          }),
        });
      } else {
        route.continue();
      }
    });

    // Mock reports API
    await page.route('**/api/reports', route => {
      if (route.request().method() === 'GET') {
        route.fulfill({
          status: 200,
          body: JSON.stringify({
            reports: [
              {
                id: '1',
                clientId: '1',
                weekStart: '2026-03-08',
                weekEnd: '2026-03-14',
                status: 'sent',
                metrics: {
                  impressions: '125450',
                  clicks: '8234',
                  conversions: '312',
                  spend: '$2450',
                },
              },
            ],
          }),
        });
      } else {
        route.continue();
      }
    });

    await use(page);
  },
});

export { expect } from '@playwright/test';