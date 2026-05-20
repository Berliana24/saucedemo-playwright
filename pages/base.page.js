export class basePage {
    constructor(page){
        this.page = page;
    }

    async goto(path){
        await this.page.goto(path);
    }

    async waitForUrl(path){
        await this.page.waitForURL(path);
    }
}