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
    log.info(`LIST ${title}`, { url: request.loadedUrl });
    await page.waitForSelector(pSelector)
    await enqueueLinks({
        selector: dphref,
        label: 'detail',
    });


});
router.addHandler('detail', async ({ request, page, log, pushData }) => {
    const title = await page.title();
    log.info(`DETAIL ${title}`, { url: request.loadedUrl });

    await page.waitForSelector(dpSelector)
    // handler()

    await pushData({
        url: request.loadedUrl,
        title,
    });


});
