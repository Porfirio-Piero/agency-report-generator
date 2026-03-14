import { test, expect } from '../fixtures/test.fixture';

test.describe('Clients', () => {
  test.beforeEach(async ({ page }) => {
    // Mock authentication
    await page.route('**/api/auth/**', route => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({ userId: 'test-user' }),
      });
    });
  });

  test('displays clients list', async ({ clientsPage, page }) => {
    // Mock clients API
    await page.route('**/api/clients', route => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          clients: [
            { id: '1', name: 'Acme Corp', email: 'acme@example.com', platforms: ['Google Analytics'] },
            { id: '2', name: 'TechStart Inc', email: 'tech@example.com', platforms: ['Facebook Ads'] },
          ],
        }),
      });
    });

    await clientsPage.goto();
    await clientsPage.expectLoaded();
    
    // Verify clients are displayed
    const count = await clientsPage.getClientCount();
    expect(count).toBe(2);
  });

  test('creates a new client', async ({ clientsPage, page }) => {
    // Mock GET clients
    await page.route('**/api/clients', route => {
      if (route.request().method() === 'GET') {
        route.fulfill({
          status: 200,
          body: JSON.stringify({ clients: [] }),
        });
      } else if (route.request().method() === 'POST') {
        route.fulfill({
          status: 201,
          body: JSON.stringify({
            client: { id: '1', name: 'New Client', email: 'new@example.com' },
          }),
        });
      }
    });

    await clientsPage.goto();
    await clientsPage.clickAddClient();
    
    // Fill form
    await page.getByLabel(/name/i).fill('New Client');
    await page.getByLabel(/email/i).fill('new@example.com');
    
    // Submit
    await page.getByRole('button', { name: /create|save/i }).click();
    
    // Verify success
    await expect(page.getByText(/client created/i)).toBeVisible();
  });

  test('displays connected platforms', async ({ clientsPage, page }) => {
    // Mock clients with connections
    await page.route('**/api/clients', route => {
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
          ],
        }),
      });
    });

    await clientsPage.goto();
    
    // Verify platform badges are visible
    await expect(page.getByText('Google Analytics')).toBeVisible();
    await expect(page.getByText('Facebook Ads')).toBeVisible();
  });

  test('deletes a client', async ({ clientsPage, page }) => {
    // Mock clients
    await page.route('**/api/clients', route => {
      if (route.request().method() === 'GET') {
        route.fulfill({
          status: 200,
          body: JSON.stringify({
            clients: [{ id: '1', name: 'Delete Me', email: 'delete@example.com' }],
          }),
        });
      }
    });

    // Mock delete
    await page.route('**/api/clients/1', route => {
      if (route.request().method() === 'DELETE') {
        route.fulfill({
          status: 200,
          body: JSON.stringify({ success: true }),
        });
      }
    });

    await clientsPage.goto();
    
    // Click delete button
    await page.getByRole('button', { name: /delete/i }).click();
    
    // Confirm deletion
    await page.getByRole('button', { name: /confirm/i }).click();
    
    // Verify success message
    await expect(page.getByText(/client deleted/i)).toBeVisible();
  });

  test('searches clients', async ({ clientsPage, page }) => {
    // Mock clients
    await page.route('**/api/clients', route => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          clients: [
            { id: '1', name: 'Acme Corp' },
            { id: '2', name: 'Beta Inc' },
          ],
        }),
      });
    });

    await clientsPage.goto();
    
    // Search for client
    await clientsPage.searchInput.fill('Acme');
    
    // Verify filtered results
    await expect(page.getByText('Acme Corp')).toBeVisible();
    await expect(page.getByText('Beta Inc')).not.toBeVisible();
  });
});