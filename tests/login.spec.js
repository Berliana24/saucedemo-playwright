// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { users } from '../test_data/users';

test.describe('Login Feature', () => {

  users.forEach((data) => {
    test(data.testScenario, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();

      await loginPage.login(data.username, data.password);

      if (data.expected === 'PASS') {
        await expect(page).toHaveURL('/inventory.html');
      } else{~
        await expect(
          loginPage.getErrorMessage(data.message)
        ).toBeVisible();
      }
    });
  });
});