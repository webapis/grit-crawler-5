import autoscroll from '../utils/autoscroll.js'
const pSelector = '#ProductListMainContainer'

const phref = '.mobilMenu a'

const url = ['https://www.nisantriko.com/']


export { pSelector, phref, url }


export default async function nisantriko({ page, enqueueLinks, request, log }) {
    debugger
    const title = await page.title();
    log.info(`COLLECT ${title}`, { url: request.loadedUrl });
    await page.waitForSelector(pSelector)
    debugger

    await autoscroll(page, 100)

    const data = await page.$$eval('.ItemOrj', (documents) => {
    
            return documents.map(document => {
                try {
                    return {
                         image: [document.querySelector('[data-original]').getAttribute('data-original')],
                         title: document.querySelector('.productName a').innerText,
                         price:'',
                         link: document.querySelector('.productName a').href,
                        currency: ''
                    }
                } catch (error) {
                    return { error: error.toString()}
                }
              
            })
       


    })

    debugger
    return data

}



