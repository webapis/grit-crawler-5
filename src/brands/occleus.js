
const pSelector = '.collection__main'

const phref = '.header__primary-nav a'

const url = ['https://occleus.com/']


export { pSelector, phref, url }


export default async function occleus({ page, enqueueLinks, request, log }) {
    debugger
    const title = await page.title();
    log.info(`COLLECT ${title}`, { url: request.loadedUrl });
    await enqueueLinks({
        selector: 'a.pagination__link',
        label: 'list',
    });
    debugger
    const data = await page.$$eval('product-card', (documents) => {

        return documents.map(document => {
            return {
                image: ['https:'+document.querySelector('img.product-card__image').srcset.split(',')[2].trim().split(' ')[0]],
                title: document.querySelector('.product-title').innerText,
                price: document.querySelector('sale-price .money').innerText.replace('₺',''),
                link: document.querySelector('.product-title').href,
                currency: 'TL'
            }
        })

    })

    debugger
    return data

}



