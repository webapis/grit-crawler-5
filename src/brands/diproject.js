import autoscroll from '../utils/autoscroll.js'
const pSelector = '.infinite-scroll-component'

const phref = '.nav-links a'

const url = ['https://diproject.co']


export { pSelector, phref, url }

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export default async function diproject({ page, enqueueLinks, request, log }) {
    debugger
    const title = await page.title();
    log.info(`COLLECT ${title}`, { url: request.loadedUrl });
    await page.waitForSelector(pSelector)
    debugger




    await autoscroll(page, 50)
    const data = await page.$$eval('[data-id]', (documents) => {

        return documents.map(document => {
          
            try {
                return {
                    image: [document.querySelector('[srcset]').getAttribute('srcset').split(',')[10].split(' ').filter(f=>f)[0]],
                    title: document.querySelector('.product-name').innerText,
                    price: document.querySelector('.sell-price').innerText.replace('₺','').trim(),
                    link:document.querySelector('a').href,
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



