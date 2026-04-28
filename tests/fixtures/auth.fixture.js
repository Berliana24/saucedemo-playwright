import {test as baseTest, expect} from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { users } from '../../test_data/users';

const validUser = users.find(user => user.expected === 'PASS');

const test = baseTest.extend({
    loggedInPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login(validUser.username, validUser.password);

        await use(page);
    }
});

export { test, expect };