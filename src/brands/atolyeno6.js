import autoscroll from '../utils/autoscroll.js'
const pSelector = ''

const phref = '.headerMenu a'

const url = ['https://www.atolyeno6.com.tr/kategori/yeni-urunler']


export { pSelector, phref, url }

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export default async function atolyeno6({ page, enqueueLinks, request, log }) {
    debugger
    const title = await page.title();
    log.info(`COLLECT ${title}`, { url: request.loadedUrl });
    await page.waitForSelector(pSelector)
    debugger

    const links = await page.$$('.navigation #divUcTopMenu .ulVar');
    debugger
    if (request.loadedUrl === 'https://www.atolyeno6.com.tr/kategori/yeni-urunler') {
        for (let link of links) {

            await link.hover();
            await enqueueLinks({
                selector: '.headerMenu a',
                label: 'list',
            });
            // Wait for a short time to allow the sub-links to appear, adjust this timing as needed
            await delay(3000)// Adjust the time as per your requirements
        }


    }
    await autoscroll(page, 50)
    const data = await page.$$eval('.shopProduct', (documents) => {

        return documents.map(document => {
          
            try {
                return {
                    image: [document.querySelector('img.resimOrginal').getAttribute('data-original')],
                    title: document.querySelector('.productName').innerText,
                    price: lastPrice ? lastPrice : discountPrice,
                    link: document.querySelector('.productName a').href,
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



