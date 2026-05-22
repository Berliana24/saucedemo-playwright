import {test, expect} from './fixtures/auth.fixture';
import {inventoryPage} from '../pages/inventory.page';
import { LoginPage } from '../pages/login.page';

test.describe('Inventory Page', () => {
    test('Should navigate to inventory page after successful login', async ({loggedInPage}) => {
        const inventory = new inventoryPage(loggedInPage);
        await inventory.goto();
    });

    test('Should redirect to Cart Page when click cart menu', async ({loggedInPage}) => {
        const inventory = new inventoryPage(loggedInPage);
        await inventory.navbarPage.clickCartMenu();
        await expect(loggedInPage).toHaveURL(/\/cart\.html/);
    });

    test('Should redirect to About Page when click about menu', async ({loggedInPage}) => {
        const inventory = new inventoryPage(loggedInPage);
        await inventory.navbarPage.clickHamburgerMenu();
        await inventory.sidebarPage.clickAboutMenu();
        await expect(loggedInPage).toHaveURL(/saucelabs\.com/);
    });

    test('Should logout and redirect to login page when click logout menu', async ({loggedInPage}) => {
        const inventory = new inventoryPage(loggedInPage);
        await inventory.navbarPage.clickHamburgerMenu();
        await inventory.sidebarPage.clickLogout();
        await expect(loggedInPage).toHaveURL('https://www.saucedemo.com/');
    });

    test('Should close sidebar menu when click close menu button', async ({loggedInPage}) => {
        const inventory = new inventoryPage(loggedInPage);
        await inventory.navbarPage.clickHamburgerMenu();
        await inventory.sidebarPage.closeMenu();
        await inventory.sidebarPage.closeMenuButton.waitFor({state: 'hidden'});
        await expect(inventory.sidebarPage.closeMenuButton).toBeHidden();
    });

    test('Should display inventory items price > 0', async ({loggedInPage}) => {
        const products = await loggedInPage.locator('.inventory_item');
        const productsCount = await products.count();
        expect(productsCount).toBeGreaterThan(0);
    });

    test('Should display product details when clicking on item name', async ({loggedInPage}) => {
        const inventory = new inventoryPage(loggedInPage);
        const productName = await inventory.getFirstProductName();
        await inventory.clickProductName(productName);
        await expect(loggedInPage).toHaveURL(/\/inventory-item\.html\?id=\d+/);
        await expect(inventory.detailProductName).toHaveText(productName);
    });

    test('Should display product details when clicking on product image', async ({loggedInPage}) => {
        const inventory = new inventoryPage(loggedInPage);
        await inventory.clickProductImage();
        await expect(loggedInPage).toHaveURL(/\/inventory-item\.html\?id=\d+/);
    });

    test('Should add product to cart when clicking add to cart button', async ({loggedInPage}) => {
        const inventory = new inventoryPage(loggedInPage);
        const initialCartCount = await inventory.getCartBadge();
        await inventory.clickAddToCart();
        const updatedCartCount = await inventory.getCartBadge();
        expect(updatedCartCount).toBe(initialCartCount + 1);
        await expect(inventory.removeButton.first()).toBeVisible();
    });

    test('Should remove product from cart when clicking remove button', async ({loggedInPage}) => {
        const inventory = new inventoryPage(loggedInPage);
        await inventory.clickAddToCart();
        const initialCartCount = await inventory.getCartBadge();
        await inventory.clickRemove();
        const updatedCartCount = await inventory.getCartBadge();
        expect(updatedCartCount).toBe(initialCartCount - 1);
        await expect(inventory.cartButton.first()).toBeVisible();
    });

    test('Should navigate to Twitter page when clicking Twitter link in footer', async ({loggedInPage}) => {
        const inventory = new inventoryPage(loggedInPage);
        const newPage = await inventory.footerPage.clickXLink(loggedInPage.context());
        await expect(newPage).toHaveURL('https://x.com/saucelabs');
    });

    test('Should navigate to Facebook page when clicking Facebook link in footer', async ({loggedInPage}) => {
        const inventory = new inventoryPage(loggedInPage);
        const newPage = await inventory.footerPage.clickFacebookLink(loggedInPage.context());
        await expect(newPage).toHaveURL('https://www.facebook.com/saucelabs');
    });

    test('Should navigate to LinkedIn page when clicking LinkedIn link in footer', async ({loggedInPage}) => {
        const inventory = new inventoryPage(loggedInPage);
        const newPage = await inventory.footerPage.clickLinkedInLink(loggedInPage.context());
        await expect(newPage).toHaveURL('https://www.linkedin.com/company/sauce-labs/');
    });

});




