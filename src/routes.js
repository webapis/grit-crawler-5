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

router.addDefaultHandler(async ({ enqueueLinks, log, page }) => {
    log.info(`enqueueing new URLs`);
    await page.waitForSelector(phref)
    const result = await enqueueLinks({
        selector: phref,
        label: 'list',
        limit: process.env.LOCAL === 'TRUE' ? 5 : 0,
    });
    debugger;

});


router.addHandler('list', async ({ request, page, log, pushData, enqueueLinks, addRequests }) => {
    const title = await page.title();
    log.info(`LIST ${title}`, { url: request.loadedUrl });
    debugger
  const exists =  await page.$(pSelector)
    if(exists){
        const brandVar = await import(`./brands/${brand}.js`)
        debugger
        const handler = brandVar.default
        debugger
        const data = await handler({ page, enqueueLinks, request, log, addRequests })
        debugger
        const mapPageTitle = data.map(m => { return { ...m, pageTitle: title,pageUrl:request.loadedUrl } })
        debugger
        // await enqueueLinks({
        //     selector: dphref,
        //     label: 'detail',
        // });
    
        await productsDataset.pushData(mapPageTitle);
    }else{
        console.log('NOT PRODUCT PAGE:', request.loadedUrl)
    }

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
