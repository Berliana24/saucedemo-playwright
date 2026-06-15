import {test, expect} from './fixtures/auth.fixture';
import {inventoryPage} from '../pages/inventory.page';
import {cartPage} from '../pages/cart.page';

test.describe('Cart Functionality', () => {
    test('Should display empty cart when no items added', async ({loggedInPage}) => {
        const inventory = new inventoryPage(loggedInPage);
        await inventory.navbarPage.clickCartMenu();
        
        await expect(inventory.cartBadge).toBeHidden();

        await expect(loggedInPage).toHaveURL(/\/cart\.html/);

        const cart = new cartPage(loggedInPage);
        await expect(cart.cartItems).toBeHidden();
    });

    test('Should display items in cart when products added', async ({loggedInPage}) => {
        const inventory = new inventoryPage(loggedInPage);
        const productName = await inventory.getFirstProductName();

        await inventory.clickAddToCart(productName);

        await inventory.navbarPage.clickCartMenu();
        await expect(loggedInPage).toHaveURL(/\/cart\.html/);

        const cart = new cartPage(loggedInPage);
        await expect(cart.cartItems).toBeVisible();

        await expect(cart.cartItemsName).toHaveText(productName);
    });

    test('Should redirect to inventory page when click continue shopping button', async ({loggedInPage}) => {
        const inventory = new inventoryPage(loggedInPage);
        const productName = await inventory.getFirstProductName();
        await inventory.clickAddToCart(productName);

        await inventory.navbarPage.clickCartMenu();

        const cart = new cartPage(loggedInPage);
        await expect(cart.continueShoppingButton).toBeVisible();

        await cart.clickContinueShopping();
        await expect(loggedInPage).toHaveURL(/\/inventory\.html/);
    });

    test('Should redirect to detail page when click product name in cart', async ({loggedInPage}) => {
        const inventory = new inventoryPage(loggedInPage);
        const productName = await inventory.getFirstProductName();
        await inventory.clickAddToCart(productName);

        await inventory.navbarPage.clickCartMenu();

        await inventory.clickProductName(productName);
    });

    test('Should remove item from cart when click remove button', async ({loggedInPage}) => {
        const inventory = new inventoryPage(loggedInPage);
        const productName = await inventory.getFirstProductName();
        await inventory.clickAddToCart(productName);

        await inventory.navbarPage.clickCartMenu();

        const initialCartCount = await inventory.getCartBadge();
        await inventory.clickRemove();
        
        const updatedCartCount = await inventory.getCartBadge();
        expect(updatedCartCount).toBe(initialCartCount - 1);

        const cart = new cartPage(loggedInPage);
        await expect(cart.cartItems).toBeHidden();
    });
});