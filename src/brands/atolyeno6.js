import autoscroll from '../utils/autoscroll.js'
const pSelector = '.shopProduct'

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



    await enqueueLinks({
        selector: '.headerMenu a',
        label: 'list',
    });
    await autoscroll(page, 50)
    const data = await page.$$eval('.shopProduct .text-center', (documents) => {

        return documents.map(document => {
          
            try {
                return {
                    image: [document.querySelector('.productImg a img').src],
                    title: document.querySelector('.productTitle').innerText,
                    price: Array.from(document.querySelector('.productPrice').childNodes).reverse()[0].nodeValue.replaceAll('\n','').trim(),
                    link: document.querySelector('.productImg a').href,
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



