
const pSelector = '.list-content'

const phref = '.navigation a'

const url = ['https://www.lovemybody.com.tr/']


export { pSelector, phref, url }

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default async function lovemybody({ page, enqueueLinks, request, log, addRequests }) {
    debugger
    const title = await page.title();
    log.info(`COLLECT ${title}`, { url: request.loadedUrl });
    debugger
    const links = await page.$$('a.navigation__link');
    debugger
    if (request.loadedUrl === 'https://www.lovemybody.com.tr/ilkbahar-yaz-koleksiyonu/') {
        for (let link of links) {

            await link.hover();
            await enqueueLinks({
                selector: 'a.navigation__submenu__item__link',
                label: 'list',
            });
            // Wait for a short time to allow the sub-links to appear, adjust this timing as needed
            await delay(3000)// Adjust the time as per your requirements
        }


    }
    await getUrls(page, addRequests)
    debugger
    const data = await page.$$eval('.product-item-box', (documents) => {

        return documents.map(document => {
            const priceBasket = document.querySelector('.product-item__campaign') ? Array.from(document.querySelector('.product-item__campaign').childNodes).reverse()[0].nodeValue.replaceAll('\n', '').trim().replace('TL', '').trim() : null
            const discount = document.querySelector('.product-discounted-price') ? document.querySelector('.product-discounted-price').innerText.replace('TL', '').trim() : null
            const saleprice = document.querySelector('.product-sale-price') ? document.querySelector('.product-sale-price').innerText.replace('TL', '').trim() : null
            return {
                image: document.querySelector('[data-image]') ? [document.querySelector('[data-image]').getAttribute('data-image')] : [document.querySelector('.product-image').src],
                title: document.querySelector('a.product-name').innerText,
                price: priceBasket ? priceBasket : (discount ? discount : saleprice),
                link: document.querySelector('a.product-name').href,
                currency: 'TL'
            }
        })

    })

    debugger
    return data

}



async function getUrls(page, addRequests) {
    const url = await page.url()
    debugger;
    const hasNextPage = await page.$('.pagination-item')
    let totalPages = 0
    debugger;
    if (hasNextPage) {
        totalPages = await page.evaluate(() => Math.max(...Array.from(document.querySelectorAll('.pagination-item'))
            .map(m => parseInt(m.innerText)) // Parse the innerText to integers
            .filter(Number)))
        const pageUrls = []

        let pagesLeft = totalPages
        for (let i = 2; i <= totalPages; i++) {

            pageUrls.push(`${url}?page=` + i)
            --pagesLeft

        }
        if (pageUrls.length > 0) {
            console.log('pageUrls', pageUrls.length)
            await addRequests(pageUrls)
        }
    }



}