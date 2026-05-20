import {basePage} from '../base.page';

export class navbarComponent extends basePage{
    constructor(page){
        super(page);

        this.cartMenu = page.getByTestId('shopping-cart-link');

        this.hamburgerMenu = page.getByRole('button', {name: /Open Menu/i});
    }

    async clickCartMenu(){
        await this.cartMenu.click();
        await super.waitForUrl('/cart.html');
    }

    async clickHamburgerMenu(){
        await this.hamburgerMenu.click();
    }
}