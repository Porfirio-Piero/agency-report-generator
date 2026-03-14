// Learn from test failures and improve
// This file tracks patterns learned from flaky tests and failures

## Timing Patterns

### Pattern 1: Wait for Network Idle
```typescript
// Before assertion, ensure page is stable
await page.waitForLoadState('networkidle');
await expect(page.getByRole('heading')).toBeVisible();
```

### Pattern 2: Use Proper Assertions
```typescript
// Bad - arbitrary wait
await page.waitForTimeout(2000);

// Good - wait for condition
await expect(page.getByRole('button')).toBeEnabled();
```

## Selector Patterns

### Pattern 1: Prefer getByRole
```typescript
// Bad - fragile
await page.locator('.submit-btn').click();

// Good - semantic
await page.getByRole('button', { name: 'Submit' }).click();
```

### Pattern 2: Use data-testid for Dynamic Content
```typescript
// In component
<button data-testid="client-create-btn">Create Client</button>

// In test
await page.getByTestId('client-create-btn').click();
```

## Flakiness Patterns

### Pattern 1: Mock API Responses
```typescript
await page.route('**/api/clients', route => {
  route.fulfill({ json: [{ id: '1', name: 'Test Client' }] });
});
```

### Pattern 2: Isolate Test Data
```typescript
test.beforeEach(async ({ page }) => {
  // Reset state before each test
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
});
```

## Common Failures

### Failure: Element Not Found
- Cause: Element not visible, timing issue
- Fix: Add `await expect(element).toBeVisible()` before interaction

### Failure: Timeout
- Cause: Page not loading fast enough
- Fix: Increase timeout in config, use `waitForLoadState`

### Failure: Screenshot Mismatch
- Cause: Dynamic content, animations
- Fix: Mask dynamic content, disable animations

## Self-Improvement Log

| Date | Test | Issue | Fix |
|------|------|-------|-----|
| 2026-03-14 | login.spec.ts | Flaky timing | Added networkidle wait |