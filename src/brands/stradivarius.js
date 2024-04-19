import autoscroll from '../utils/autoscroll.js'
const pSelector = '[id^="ProductGridItem_"]'

const phref = '[data-cy="visual-filter-item"]'

const url = ['https://www.stradivarius.com/tr/kadin/yeni-n1906']


export { pSelector, phref, url }

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export default async function stradivarius({ page, enqueueLinks, request, log }) {
    debugger
    const title = await page.title();
    log.info(`COLLECT ${title}`, { url: request.loadedUrl });
    await page.waitForSelector(pSelector)
    debugger
    await page.waitForSelector('[data-testid="change-view-button"]')
    await page.click('[data-testid="change-view-button"]')
    await delay(3000)
    // await autoscroll(page, 80)
    const data = await page.$$eval('.sc-eTNRI', (documents) => {

        return documents.map(document => {
     
            try {
                return {
                    image: [],
                    title: '',
                    price: '',
                    link: '',
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
    await page.waitForSelector('.appliedFilter.FiltrelemeUrunAdet span')
    const productCount = await page.evaluate(() => parseInt(document.querySelector('.appliedFilter.FiltrelemeUrunAdet span').innerText.replace(/[^\d]/gi, '') ))
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