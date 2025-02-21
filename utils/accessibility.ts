import { Page, TestInfo, test } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

export async function checkAccessibility(page: Page, testInfo: TestInfo) {
  await test.step('check a11y', async () => {
    const { violations } = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    await testInfo.attach('accessibility-scan-results', {
      body: JSON.stringify(violations, null, 2),
      contentType: 'application/json'
    });

    test.expect.soft(violations).toHaveLength(0);
  });
}
