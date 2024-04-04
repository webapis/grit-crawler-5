import autoscroll from '../utils/autoscroll.js'
const pSelector = '.products-grid'

const phref = '.navbar a'

const url = ['https://www.dagi.com.tr/kadin/kadin-corap-modelleri']


export { pSelector, phref, url }


export default async function dagi({ page, enqueueLinks, request, log }) {
    debugger
    const title = await page.title();
    log.info(`COLLECT ${title}`, { url: request.loadedUrl });
    await page.waitForSelector(pSelector)
    debugger
    await autoscroll(page, 150)
    const data = await page.$$eval('.product-item', (documents) => {
    
            return documents.map(document => {
                try {
                    return {
                         image: [document.querySelector('.photo-swapper.active').getAttribute('data-src')],
                         title: document.querySelector('.product-item-link').innerHTML,
                         price: document.querySelector('.special-price .price') ? document.querySelector('.special-price .price').innerText.replace('₺', '') : document.querySelector('.price.parent').innerText.replace('₺', ''),
                         link: document.querySelector('.product-item-link').href,
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



