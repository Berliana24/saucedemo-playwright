import {basePage} from './base.page';

export class cartPage extends basePage{
    constructor(page){
        super(page);
        this.cartItems = page.locator('.cart_item');
        this.cartItemsName = page.locator('.inventory_item_name');
        this.continueShoppingButton = page.getByRole('button', {name: /Continue Shopping/i});
    }

    async clickContinueShopping(){
        await this.continueShoppingButton.click();
    }
}