import {basePage} from './base.page';
import {navbarComponent} from './components/navbar.component';
import { sidebarComponent } from './components/sidebar.component';
import { footerComponent } from './components/footer.component';

export class inventoryPage extends basePage{
    constructor(page){
        super(page);
        this.navbarPage = new navbarComponent(page);
        this.sidebarPage = new sidebarComponent(page);
        
        this.productsName = page.locator('.inventory_item_name');
        this.productsImage = page.locator('.inventory_item_img a');

        this.detailProductName = page.locator('.inventory_details_name');

        this.cartButton = page.getByRole('button', {name: /Add to cart/i});
        this.removeButton = page.getByRole('button', {name: /Remove/i});

        this.cartBadge = page.locator('.shopping_cart_badge');

        this.footerPage = new footerComponent(page);
    }

    async goto(){
        await super.goto('/inventory.html');
    }

    async getFirstProductName(){
        return (await this.productsName.first().textContent())?.trim();
    }

    async clickProductName(productsName){
        await this.productsName.filter({hasText: productsName}).click();
    }

    async clickProductImage(){
        await this.productsImage.first().click();
    }

    async clickAddToCart(){
        await this.cartButton.first().click();
    }

    async clickRemove(){
        await this.removeButton.first().click();
    }

    async getCartBadge(){
        if (await this.cartBadge.count() === 0){
            return 0;
        }
        return Number(await this.cartBadge.textContent());
    }

}