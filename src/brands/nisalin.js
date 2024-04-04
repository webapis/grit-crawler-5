import autoscroll from '../utils/autoscroll.js'
const pSelector = '.ProductList'

const phref = '.navigation a'

const url = ['https://www.nisalin.com/']


export { pSelector, phref, url }


export default async function nisalin({ page, enqueueLinks, request, log }) {
    debugger
    const title = await page.title();
    log.info(`COLLECT ${title}`, { url: request.loadedUrl });
    await page.waitForSelector(pSelector)
    debugger
   await autoscroll(page, 150)
    const data = await page.$$eval('.productItem', (documents) => {
    
            return documents.map(document => {
                try {
                    return {
                         image: [document.querySelector('[data-original]').getAttribute('data-original')],
                         title: document.querySelector('.productName a').innerText,
                         price: document.querySelector('.discountPrice').innerText.replace('₺',''),
                         link: document.querySelector('.productName a').href,
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



