import autoscroll from '../utils/autoscroll.js'
const pSelector = '#ProductPageProductList'

const phref = '.navigation a'

const url = ['https://www.sorbe.co/']


export { pSelector, phref, url }


export default async function sorbe({ page, enqueueLinks, request, log }) {
    debugger
    const title = await page.title();
    log.info(`COLLECT ${title}`, { url: request.loadedUrl });
    await page.waitForSelector(pSelector)
    debugger
    await autoscroll(page, 50)
    const data = await page.$$eval('.productItem', (documents) => {
    
            return documents.map(document => {
                try {
                    return {
                         image: [document.querySelector('[data-original]').getAttribute('data-original')],
                         title: document.querySelector('.productName.detailUrl a').getAttribute('title'),
                         price: document.querySelector('.discountPrice').innerText.replace('USD','').replaceAll('\n',''),
                         link: document.querySelector('.productName.detailUrl a').href,
                         currency: 'USD'
                    }
                } catch (error) {
                    return { error: error.toString()}
                }
              
            })
       


    })

    debugger
    return data

}