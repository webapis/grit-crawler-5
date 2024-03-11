import dotenv from 'dotenv';
import { createPuppeteerRouter,Dataset } from 'crawlee';
import handler from './handler.js'
import cleanPrice from './utils/cleanPrice.js';
dotenv.config({ silent: true });

const brand = process.env.marka
const brandvar = await import(`./brands/${brand}.js`)
const { pSelector, dpSelector, phref, dphref } = brandvar
debugger

const productsDataset = await Dataset.open('products');
export const router = createPuppeteerRouter();

router.addDefaultHandler(async ({ enqueueLinks, log }) => {
    log.info(`enqueueing new URLs`);
    await enqueueLinks({
        selector: phref,
        label: 'list',
        limit: 3,
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
    const data = await handler({ page, ...brandvar })
    const price1 = cleanPrice(data.price1)
    const priceInBasket = cleanPrice(data.priceInBasket)
    const cleanedPrice = {
        ...data, price1,
        priceInBasket,
    }
    await productsDataset.pushData(data);


});
