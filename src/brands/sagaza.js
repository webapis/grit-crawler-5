
const pSelector = '.collection__products'

const phref = '.navlink.navlink--child'

const url = ['https://sagaza.com/']


export { pSelector, phref, url }


export default async function sagaza({ page, enqueueLinks, request, log }) {
    debugger
    const title = await page.title();
    log.info(`COLLECT ${title}`, { url: request.loadedUrl });
    await enqueueLinks({
        selector: '.pagination-custom__num a',
        label: 'list',
    });
    debugger
    const data = await page.$$eval('.product-grid-item', (documents) => {

        return documents.map(document => {
            return {
                image: ['https:' + document.querySelector('product-grid-item-image img').srcset.split(',')[0].split(' ')[0].replaceAll('\n\n', '')],
                title: document.querySelector('.product__grid__title').innerText,
                price: document.querySelector('.price').innerText.replace('TL', ''),
                link: document.querySelector('.product__grid__info a').href,
                currency: 'TL'
            }
        })

    })

    debugger
    return data

}



