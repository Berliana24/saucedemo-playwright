import { basePage } from "../base.page";

export class footerComponent extends basePage {
    constructor(page) {
        super(page);
        this.xLink = page.getByRole('link', { name: /Twitter/i });
        this.facebookLink = page.getByRole('link', { name: /Facebook/i });
        this.linkedinLink = page.getByRole('link', { name: /LinkedIn/i });
    }

    async clickXLink(context) {
        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            this.xLink.click()
        ]);
        await newPage.waitForLoadState();
        return newPage;
    }

    async clickFacebookLink(context) {
        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            this.facebookLink.click()
        ]);
        await newPage.waitForLoadState();
        return newPage;
    }

    async clickLinkedInLink(context) {
        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            this.linkedinLink.click()
        ]);
        await newPage.waitForLoadState();
        return newPage;
    }
}