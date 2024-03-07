import dotenv from 'dotenv';
import { createPuppeteerRouter } from 'crawlee';
dotenv.config({ silent: true });

const brand = process.env.brand
const { default: handler, pSelector, dpSelector, phref, dphref } = await import(`./handlers/${brand}.js`)
debugger


export const router = createPuppeteerRouter();

router.addDefaultHandler(async ({ enqueueLinks, log }) => {
    log.info(`enqueueing new URLs`);
 const result =   await enqueueLinks({
        selector: phref,
        label: 'list',
    });


});


router.addHandler('list', async ({ request, page, log, pushData,enqueueLinks }) => {
    const title = await page.title();
    log.info(`${title}`, { url: request.loadedUrl });

debugger
    const result =   await enqueueLinks({
        selector: dphref,
        label: 'detail',
    });
    debugger
    await pushData({
        url: request.loadedUrl,
        title,
    });
    debugger
console.log('LIST HANDLED',title)
    
});
router.addHandler('detail', async ({ request, page, log, pushData }) => {
    const title = await page.title();
    log.info(`${title}`, { url: request.loadedUrl });


   // handler()
    debugger
    await pushData({
        url: request.loadedUrl,
        title,
    });

    console.log('DETAIL HANDLED',title)
});
