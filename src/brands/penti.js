import autoscroll from '../utils/autoscroll.js'
const pSelector = '.plp-list'

const phref = '#site-header a'

const url = ['https://www.penti.com/']


export { pSelector, phref, url }


export default async function penti({ page, enqueueLinks, request, log, addRequests }) {
    debugger
    const title = await page.title();
    log.info(`COLLECT ${title}`, { url: request.loadedUrl });
    await page.waitForSelector(pSelector)



    await getUrls(page, addRequests)


    const data = await page.$$eval('.prd', (documents) => {

        return documents.map(document => {

            try {
                return {
                    image: [document.querySelector('img[data-source]').getAttribute('data-source')],
                    title: document.querySelector('.prd-title').innerText,
                    price: document.querySelector('.prc.prc-last').innerText.replace('₺',''),
                    link: document.querySelector('.prd-link').href,
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



async function getUrls(page, addRequests) {
    const url = await page.url()
    debugger;
    await page.waitForSelector('.plp-info.js-plp-info')
    const productCount = await page.evaluate(() => parseInt(document.querySelector('.plp-info.js-plp-info').innerText.replace(/[^\d]/gi, '')))
    debugger;
    const totalPages = Math.ceil(productCount / 100)
    const pageUrls = []

    let pagesLeft = totalPages
    for (let i = 2; i <= totalPages; i++) {

        pageUrls.push(`${url}?page=` + i)
        --pagesLeft

    }
    if (pageUrls.length > 0) {

        await addRequests(pageUrls)
    }


}