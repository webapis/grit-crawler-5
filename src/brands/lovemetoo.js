import autoscroll from '../utils/autoscroll.js'
const pSelector = '.product-list'

const phref = '.navigation a'

const url = ['https://lovemetoo.com.tr/']


export { pSelector, phref, url }

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export default async function lovemetoo({ page, enqueueLinks, request, log }) {
    debugger
    const title = await page.title();
    log.info(`COLLECT ${title}`, { url: request.loadedUrl });
    await page.waitForSelector(pSelector)
    debugger

 
    await autoscroll(page, 50)
    const data = await page.$$eval('.product-block', (documents) => {

        return documents.map(document => {
            try {
                return {
                    image: ['https:'+document.querySelector('[srcset]').getAttribute('srcset').split(',')[5].split(' ').filter(f=>f)[0]],
                    title: document.querySelector('.product-block__title').innerText,
                    price: document.querySelector('.money').innerText.replace('$','').trim(),
                    link: document.querySelector('.product-link').href,
                    currency: 'USD'
                }
            } catch (error) {
                return { error: error.toString() }
            }
        })
    })

    debugger
    return data

}



