import autoscroll from '../utils/autoscroll.js'
const pSelector = '#ProductPageProductList'

const phref = '.navigation a'

const url = ['https://www.setre.com/']


export { pSelector, phref, url }

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export default async function setre({ page, enqueueLinks, request, log, addRequests }) {
    debugger
    const title = await page.title();
    log.info(`COLLECT ${title}`, { url: request.loadedUrl });
    await page.waitForSelector(pSelector)
    debugger

    const links = await page.$$('.navigation #divUcTopMenu .ulVar');
    debugger
    if (request.loadedUrl === 'https://www.setre.com/yaz-sezonu') {
        for (let link of links) {

            await link.hover();
            await enqueueLinks({
                selector: '.navigation a',
                label: 'list',
            });
            // Wait for a short time to allow the sub-links to appear, adjust this timing as needed
            await delay(3000)// Adjust the time as per your requirements
        }


    }

    await getUrls(page, addRequests)


    const data = await page.$$eval('.productItem', (documents) => {

        return documents.map(document => {
            const lastPrice = document.querySelector('span.lastprice') ? document.querySelector('span.lastprice').innerText.replace('$', '').trim() : null
            const discountPrice = document.querySelector('.discountPrice span') ? document.querySelector('.discountPrice span').innerText.replace('$', '').trim() : null
            try {
                return {
                    image: [document.querySelector('img.resimOrginal').getAttribute('data-original')],
                    title: document.querySelector('.productName').innerText,
                    price: lastPrice ? lastPrice : discountPrice,
                    link: document.querySelector('.productName a').href,
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



async function getUrls(page, addRequests) {
    const url = await page.url()
    debugger;
    await page.waitForSelector('.appliedFilter.FiltrelemeUrunAdet span')
    const productCount = await page.evaluate(() => parseInt(document.querySelector('.appliedFilter.FiltrelemeUrunAdet span').innerText.replace(/[^\d]/gi, '')))
    debugger;
    const totalPages = Math.ceil(productCount / 40)
    const pageUrls = []

    let pagesLeft = totalPages
    for (let i = 2; i <= totalPages; i++) {

        pageUrls.push(`${url}?sayfa=` + i)
        --pagesLeft

    }
    if (pageUrls.length > 0) {

        await addRequests(pageUrls)
    }


}