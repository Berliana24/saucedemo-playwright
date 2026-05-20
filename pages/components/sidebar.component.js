import {basePage} from '../base.page';

export class sidebarComponent extends basePage{
    constructor(page){
        super(page);

        this.aboutMenu = page.getByRole('link', {name: /About/i});

        this.logout = page.getByRole('link', {name: /Logout/i});

        this.resetMenu = page.getByRole('link', {name: /Reset App State/i});

        this.closeMenuButton = page.getByRole('button', {name: /Close Menu/i});
    }

    async clickAboutMenu(){
        await this.aboutMenu.click();
        await super.waitForUrl('https://saucelabs.com/');
    }

    async clickLogout(){
        await this.logout.click();
        await super.waitForUrl('https://www.saucedemo.com/');
    }

    async closeMenu(){
        await this.closeMenuButton.click();
    }

}