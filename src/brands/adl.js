
const pSelector = '.products__items'

const phref = '.navigation a'

const url = ['https://www.adl.com.tr/']


export { pSelector, phref, url }


export default async function adl({ page, enqueueLinks,request,log }) {
    debugger
    const title = await page.title();
    log.info(`COLLECT ${title}`, { url: request.loadedUrl });
 await enqueueLinks({
        selector:'a.pagination__item.js-pagination-item',
        label: 'list',
    });
debugger
    const data = await page.$$eval('.product-item', (documents) => {

        return documents.map(document => {
            return {
                image: Array.from(document.querySelectorAll('img')).map(m => m.getAttribute('data-src')).filter(f => f),
                title: document.querySelector('.product-item__name').innerText,
                price: document.querySelector('.price__new').innerText.replace('TL', ''),
                link: document.querySelector('.product-item a').href,
                currency: 'TL'
            }
        })

    })

    debugger
    return data

}



