
import autoscroll from '../utils/autoscroll.js'
const pSelector = '.product-list'

const phref = '.product-link'

const url = ['https://nihanpeker.com/collections']


export { pSelector, phref, url }


export default async function nihanpeker({ page, enqueueLinks, request, log }) {
    debugger
    const title = await page.title();
    log.info(`COLLECT ${title}`, { url: request.loadedUrl });
    await enqueueLinks({
        selector: '.pagination a',
        label: 'list',
    });
    await autoscroll(page, 150)
    //await page.waitForSelector('.product-block__title')
    debugger
    const data = await page.$$eval('[data-product-id]', (documents) => {

        return documents.map(document => {
            return {
                image:  ['https:'+document.querySelector('[data-srcset]').getAttribute('data-srcset').split(',')[5].trim().split(' ')[0]],
                 title: document.querySelector('.product-block__title').innerText,
                 price: document.querySelector('.product-price__item').innerText.replace('TL',''),
                link: document.querySelector('.product-link').href,
                currency: 'TL'
            }
        })

    })

    debugger
    return data

}



