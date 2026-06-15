import {basePage} from './base.page';

export class detailPage extends basePage{
    constructor(page){
        super(page);
        this.backButton = page.getByRole('button', {name: /Back to products/i});
    }

    async clickBackButton(){
        await this.backButton.click();
    }
    
}