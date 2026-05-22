import { basePage } from "./base.page"; 

export class LoginPage extends basePage{
    constructor(page){
        super(page);

        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
    }

    async goto(){
        await super.goto('/inventory.html');
    }

    async login(username, password){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    getErrorMessage(message){
        return this.page.getByText(new RegExp(message, 'i'));
    }
}
