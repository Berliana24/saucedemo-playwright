import {test, expect} from './fixtures/auth.fixture';
import {inventoryPage} from '../pages/inventory.page';
import {detailPage} from '../pages/detail.page';

test.describe('Detail Page', () => {
    test('Should add product to cart when clicking add to cart button in Detail Page', async ({loggedInPage}) => {
        const inventory = new inventoryPage(loggedInPage);
        const productName = await inventory.getFirstProductName();
        await inventory.clickProductName(productName);
       
        const initialCartCount = await inventory.getCartBadge();
        await inventory.clickAddToCart();

        const updatedCartCount = await inventory.getCartBadge();
        expect(updatedCartCount).toBe(initialCartCount + 1);
        await expect(inventory.removeButton.first()).toBeVisible();
    });

    test('Should remove product from cart when clicking remove button in Detail Page', async ({loggedInPage}) => {
        const inventory = new inventoryPage(loggedInPage);
        const productName = await inventory.getFirstProductName();
        await inventory.clickProductName(productName);
       
        await inventory.clickAddToCart();
        const initialCartCount = await inventory.getCartBadge();
        await inventory.clickRemove();

        const updatedCartCount = await inventory.getCartBadge();
        expect(updatedCartCount).toBe(initialCartCount - 1);
        await expect(inventory.cartButton.first()).toBeVisible();
    });

    test('Should navigate to Inventory page when clicking back button', async ({loggedInPage}) => {
        const inventory = new inventoryPage(loggedInPage);
        const productName = await inventory.getFirstProductName();
        await inventory.clickProductName(productName);

        const detail = new detailPage(loggedInPage);
        await detail.clickBackButton();
        await expect(loggedInPage).toHaveURL(/\/inventory\.html/);
    });
})