import dotenv from 'dotenv';
import { createPuppeteerRouter, Dataset } from 'crawlee';

import cleanPrice from './utils/cleanPrice.js';
dotenv.config({ silent: true });

const brand = process.env.marka
const brandvar = await import(`./brands/${brand}.js`)
const { pSelector, dpSelector, phref, dphref } = brandvar
debugger

const productsDataset = await Dataset.open('products');
export const router = createPuppeteerRouter();

router.addDefaultHandler(async ({ enqueueLinks, log,page }) => {
    log.info(`enqueueing new URLs`);
    await page.waitForSelector(phref)
 const result =   await enqueueLinks({
        selector: phref,
        label: 'list',
      //  limit: 3,
    });
debugger;

});


router.addHandler('list', async ({ request, page, log, pushData, enqueueLinks }) => {
    const title = await page.title();
    log.info(`LIST ${title}`, { url: request.loadedUrl });
    debugger
    await page.waitForSelector(pSelector)

    const brandVar = await import(`./brands/${brand}.js`)
        debugger
        const handler= brandVar.default
        debugger
        const data = await handler({ page })
debugger
    // await enqueueLinks({
    //     selector: dphref,
    //     label: 'detail',
    // });

    await productsDataset.pushData(data);
debugger
});
// router.addHandler('detail', async ({ request, page, log, pushData }) => {
//     const title = await page.title();
//     log.info(`DETAIL ${title}`, { url: request.loadedUrl });

//     await page.waitForSelector(dpSelector)
// debugger
//     const brandVar = await import(`./brands/${brand}.js`)
//     debugger
//     const handler= brandVar.default
//     debugger
//     const data = await handler({ page })
//     debugger
//     try {
//         const price1 = cleanPrice(data.price1)
//         const priceInBasket = cleanPrice(data.priceInBasket)
//         const cleanedPrice = {
//             ...data, price1,
//             priceInBasket,
//         }
//         await productsDataset.pushData(data);
//     } catch (error) {
//         console.log('error', data)
//         throw error
//     }



// });
