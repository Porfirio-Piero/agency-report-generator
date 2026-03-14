import { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

export class ClientsPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly addClientButton: Locator;
  readonly clientCards: Locator;
  readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: /clients/i });
    this.addClientButton = page.getByRole('button', { name: /add client/i });
    this.clientCards = page.getByRole('article');
    this.searchInput = page.getByPlaceholder(/search clients/i);
  }

  async goto() {
    await this.page.goto('/clients');
  }

  async expectLoaded() {
    await expect(this.heading).toBeVisible();
  }

  async clickAddClient() {
    await this.addClientButton.click();
  }

  async getClientCount(): Promise<number> {
    return await this.clientCards.count();
  }

  async getClientByName(name: string): Promise<Locator> {
    return this.page.getByRole('article').filter({ hasText: name });
  }

  async connectPlatform(clientName: string, platform: string) {
    const client = await this.getClientByName(clientName);
    await client.getByRole('button', { name: new RegExp(`connect.*${platform}`, 'i') }).click();
  }

  async viewReports(clientName: string) {
    const client = await this.getClientByName(clientName);
    await client.getByRole('button', { name: /view reports/i }).click();
  }
}