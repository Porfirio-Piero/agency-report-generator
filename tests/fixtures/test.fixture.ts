import { test as base } from '@playwright/test';
import { LoginPage } from './login.page';
import { DashboardPage } from './dashboard.page';
import { ClientsPage } from './clients.page';

// Extend fixtures with page objects
export const test = base.extend<{
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  clientsPage: ClientsPage;
}>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },
  clientsPage: async ({ page }, use) => {
    const clientsPage = new ClientsPage(page);
    await use(clientsPage);
  },
});

export { expect } from '@playwright/test';