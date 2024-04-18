import autoscroll from '../utils/autoscroll.js'
const pSelector = '.productList'

const phref = '.menu-wrapper a'

const url = ['https://www.colins.com.tr/']


export { pSelector, phref, url }


export default async function colins({ page, enqueueLinks, request, log }) {
    debugger
    const title = await page.title();
    log.info(`COLLECT ${title}`, { url: request.loadedUrl });
    await page.waitForSelector(pSelector)
    debugger
    // await autoscroll(page, 150)
    const data = await page.$$eval('.productCartMain', (documents) => {

        return documents.map(document => {
            const priceNew = document.querySelector('.product-new-price') ? document.querySelector('.product-new-price').innerText.replace('TL', '').trim() : null
            const priceLast = document.querySelector('.product-price') ? document.querySelector('.product-price').innerText.replace('TL', '').trim() : null
            try {
                return {
                    image: [],
                    title: document.querySelector('.product-name.track-link').getAttribute('title'),
                    price: priceNew ? priceNew : priceLast,
                    link: document.querySelector('.product-name.track-link').href,
                    currency: 'TL'
                }
            } catch (error) {
                return { error: error.toString() }
            }

        })

    })

    debugger
    return data

}



