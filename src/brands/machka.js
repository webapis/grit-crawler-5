import autoscroll from '../utils/autoscroll.js'
const pSelector = '.ems-prd-list'

const phref = '.modal-body a'

const url = ['https://www.machka.com.tr']


export { pSelector, phref, url }


export default async function machka({ page, enqueueLinks, request, log }) {
    debugger
    const title = await page.title();
    log.info(`COLLECT ${title}`, { url: request.loadedUrl });
    await page.waitForSelector(pSelector)
    debugger
   await autoscroll(page, 150)
    const data = await page.$$eval('.ems-prd', (documents) => {
    
            return documents.map(document => {
                try {
                    return {
                         image: [document.querySelector('[data-image-src]').getAttribute('data-image-src')],
                         title: '.ems-prd-title',
                         price: document.querySelector('.ems-prd-price-last').innerText.replace('₺','').trim(),
                         link: document.querySelector('.item-link').href,
                        currency: 'TL'
                    }
                } catch (error) {
                    return { error: error.toString()}
                }
              
            })
       


    })

    debugger
    return data

}



