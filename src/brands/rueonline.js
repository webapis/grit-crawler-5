import autoscroll from '../utils/autoscroll.js'
const pSelector = '#ProductPageProductList'

const phref = '#ResimliMenu1 a'

const url = ['https://www.rueonline.com/']


export { pSelector, phref, url }


export default async function rueonline({ page, enqueueLinks, request, log }) {
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
                         image: [document.querySelector('.productImage [data-original]').getAttribute('data-original')],
                         title: document.querySelector('.productName').innerText,
                         price: document.querySelector('.discountPrice').innerText.replace('TL','').trim(),
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