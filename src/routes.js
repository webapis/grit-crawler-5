import dotenv from 'dotenv';
import { createPuppeteerRouter } from 'crawlee';
dotenv.config({ silent: true });

const brand = process.env.brand
const { default: handler, pSelector, dpSelector, phref, dphref } = await import(`./handlers/${brand}.js`)
debugger


export const router = createPuppeteerRouter();

router.addDefaultHandler(async ({ enqueueLinks, log }) => {
    log.info(`enqueueing new URLs`);
    await enqueueLinks({
        selector: phref,
        label: 'list',
    });


});


router.addHandler('list', async ({ request, page, log, pushData, enqueueLinks }) => {
    const title = await page.title();
    log.info(`${title}`, { url: request.loadedUrl });

    await enqueueLinks({
        selector: dphref,
        label: 'detail',
    });


});
router.addHandler('detail', async ({ request, page, log, pushData }) => {
    const title = await page.title();
    log.info(`${title}`, { url: request.loadedUrl });


    // handler()

    await pushData({
        url: request.loadedUrl,
        title,
    });


});
