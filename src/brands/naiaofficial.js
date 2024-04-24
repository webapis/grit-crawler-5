
const pSelector = '.collection__products'

const phref = 'nav.header__menu a'

const url = ['https://naiaofficial.com/']


export { pSelector, phref, url }


export default async function naiaofficial({ page, enqueueLinks, request, log }) {
    debugger
    const title = await page.title();
    log.info(`COLLECT ${title}`, { url: request.loadedUrl });
    await enqueueLinks({
        selector: '.pagination-custom a',
        label: 'list',
    });
    debugger
    const data = await page.$$eval('.product-item', (documents) => {

        return documents.map(document => {
            try {
                return {
                    image: ['http:' + document.querySelector('[data-bgset]').getAttribute('data-bgset').split(',')[3].split(' ').filter(f=>f)[0]],
                    title: document.querySelector('.product__grid__title').innerText,
                    price: document.querySelector('.new-price').innerText.replace('₺', '').trim(),
                    link: document.querySelector('.product-link').href,
                    currency: 'TL'
                }
            } catch (error) {
                return { error: error.toString(), content: document.innerHTML }
            }

        })

    })

    debugger
    return data

}

