import autoscroll from '../utils/autoscroll.js'
const pSelector = '.products'

const phref = '.navbar a'

const url = ['https://www.network.com.tr/']


export { pSelector, phref, url }

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export default async function network({ page, enqueueLinks, request, log, addRequests }) {
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
    //         await enqueueLinks({
    //             selector: '.navigation a',
    //             label: 'list',
    //         });
    //         // Wait for a short time to allow the sub-links to appear, adjust this timing as needed
    //         await delay(3000)// Adjust the time as per your requirements
    //     }


    // }

    await getUrls(page, addRequests)


    const data = await page.$$eval('.products__item', (documents) => {

        return documents.map(document => {

            try {
                return {
                    image: [document.querySelector('[data-original]').getAttribute('data-original')],
                    title: document.querySelector('.product__title').innerText,
                    price: document.querySelector('.product__price.-actual').innerText.replace('TL', '').trim(),
                    link: document.querySelector('.product__contentHeader a').href,
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
    const pageExists = await page.$('.js-total-products-count')
    if (pageExists) {
        const productCount = await page.evaluate(() => parseInt(document.querySelector('.js-total-products-count').innerText))
        debugger;
        const totalPages = Math.ceil(productCount / 60)
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



}