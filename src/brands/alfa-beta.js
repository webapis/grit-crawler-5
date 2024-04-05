import autoscroll from '../utils/autoscroll.js'
const pSelector = '.showcase-container'

const phref = '#navigation a'

const url = ['https://www.alfa-beta.com.tr/']


export { pSelector, phref, url }


export default async function alfabeta({ page, enqueueLinks, request, log }) {
    debugger
    const title = await page.title();
    log.info(`COLLECT ${title}`, { url: request.loadedUrl });
    await page.waitForSelector(pSelector)
    debugger

    await enqueueLinks({
        selector:'.paginate-content a',
        label: 'list',
    });
   // await autoscroll(page, 50)
    const data = await page.$$eval('.showcase', (documents) => {
    
            return documents.map(document => {
                try {
                    return {
                         image: ['https:'+document.querySelector('.showcase-image img').getAttribute('data-src')],
                         title: document.querySelector('.showcase-title').innerText,
                         price: document.querySelector('.showcase-price-new').innerText.replace('TL','').trim(),
                         link: document.querySelector('.showcase-title a').href,
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



