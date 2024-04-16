import autoscroll from '../utils/autoscroll.js'
const pSelector = '#catalog-list'

const phref = '#main-menu a'

const url = ['https://gustoeshop.com/']


export { pSelector, phref, url }

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export default async function gustoeshop({ page, enqueueLinks, request, log, addRequests }) {
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


    const data = await page.$$eval('.product-item', (documents) => {

        return documents.map(document => {

            try {
                return {
                    image: [document.querySelector('.image-inner img').getAttribute('data-src')],
                    title: document.querySelector('.product-title a').innerText,
                    price: document.querySelector('.product-price').innerText,
                    link: document.querySelector('.product-title a').href,
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
    await page.waitForSelector('.text-center.text-gray.mb-2')
    const lastPage = await page.evaluate(() => Math.ceil(parseInt(document.querySelector('.text-center.text-gray.mb-2').innerText.replace(/[^\d]/gi, '')) / 24))

        const nextPage = `${url}?ps=${lastPage}`

        await addRequests([nextPage])
    




}