
const pSelector = '.list-content'

const phref = '.navigation a'

const url = ['https://www.lovemybody.com.tr/']


export { pSelector, phref, url }


export default async function lovemybody({ page, enqueueLinks, request, log }) {
    debugger
    const title = await page.title();
    log.info(`COLLECT ${title}`, { url: request.loadedUrl });
    await enqueueLinks({
        selector: 'a.pagination-item',
        label: 'list',
    });
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



