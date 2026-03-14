import { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly activeClientsStat: Locator;
  readonly reportsThisWeekStat: Locator;
  readonly timeSavedStat: Locator;
  readonly deliveredStat: Locator;
  readonly recentReportsTable: Locator;
  readonly addClientButton: Locator;
  readonly generateReportButton: Locator;
  readonly viewAnalyticsButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: /dashboard/i });
    this.activeClientsStat = page.getByText(/active clients/i).locator('..');
    this.reportsThisWeekStat = page.getByText(/reports this week/i).locator('..');
    this.timeSavedStat = page.getByText(/time saved/i).locator('..');
    this.deliveredStat = page.getByText(/delivered/i).locator('..');
    this.recentReportsTable = page.getByRole('table');
    this.addClientButton = page.getByRole('button', { name: /add client/i });
    this.generateReportButton = page.getByRole('button', { name: /generate report/i });
    this.viewAnalyticsButton = page.getByRole('button', { name: /view analytics/i });
  }

  async goto() {
    await this.page.goto('/dashboard');
  }

  async expectLoaded() {
    await expect(this.heading).toBeVisible();
    await expect(this.activeClientsStat).toBeVisible();
    await expect(this.reportsThisWeekStat).toBeVisible();
  }

  async clickAddClient() {
    await this.addClientButton.click();
  }

  async clickGenerateReport() {
    await this.generateReportButton.click();
  }

  async getStatValue(statName: string): Promise<string> {
    const stat = this.page.getByText(new RegExp(statName, 'i')).locator('..');
    return await stat.getByRole('heading').textContent() || '';
  }
}