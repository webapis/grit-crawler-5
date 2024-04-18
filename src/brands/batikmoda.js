import autoscroll from '../utils/autoscroll.js'
const pSelector = '.ProductListContent'

const phref = '.navigation a'

const url = ['https://www.batikmoda.com/']


export { pSelector, phref, url }

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export default async function batikmoda({ page, enqueueLinks, request, log, addRequests }) {
    debugger
    const title = await page.title();
    log.info(`COLLECT ${title}`, { url: request.loadedUrl });
    await page.waitForSelector(pSelector)
    debugger

    // const links = await page.$$('.navigation #divUcTopMenu .ulVar');
    // debugger
    // if (request.loadedUrl === 'https://www.setre.com/yaz-sezonu') {
    //     for (let link of links) {

    //         await link.hover();
            await enqueueLinks({
                selector: '.pageNumber.pageNumberBottom a',
                label: 'list',
            });
    //         // Wait for a short time to allow the sub-links to appear, adjust this timing as needed
    //         await delay(3000)// Adjust the time as per your requirements
    //     }


    // }

    //await getUrls(page, addRequests)


    const data = await page.$$eval('.productItem', (documents) => {

        return documents.map(document => {
        
            try {
                return {
                    image: [document.querySelector('.productImage [data-original]').getAttribute('data-original')],
                    title: document.querySelector('.productName.detailUrl').innerText,
                    price: document.querySelector('.discountPrice').innerText.replace('₺',''),
                    link: document.querySelector('.productName.detailUrl a').href,
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