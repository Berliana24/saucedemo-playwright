export class LoginPage {
    constructor(page){
        this.page = page;

        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
    }

    async goto(){
        await this.page.goto('/inventory.html');
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
