
const pSelector = '.collection__products'

const phref = '.navlink'

const url = ['https://jusdepommes.com/']


export { pSelector, phref, url }


export default async function jusdepommes({ page, enqueueLinks, request, log }) {
    debugger
    const title = await page.title();
    const url = await page.url()
    log.info(`COLLECT ${title}`, url);
    await enqueueLinks({
        selector: '.pagination-custom a',
        label: 'list',
    });

    debugger

    const data = await page.$$eval('.product-grid-item', (documents) => {

        return documents.map(document => {
            try {
                return {
                    image: ['https:' + document.querySelector('[data-bgset]').getAttribute('data-bgset').replaceAll('\n', '').split(',')[2].split(' ').filter(f => f)[0]],
                    title: document.querySelector('.product__grid__title').innerText,
                    price: document.querySelector('.product__grid__price ').innerText.replace('TL', ''),
                    link: document.querySelector('.product__grid__info A').href,
                    currency: 'TL'
                }
            } catch (error) {
                return { error: error.toString(), content: document.innerHTML }
            }

        })

    })

    debugger
    return data.filter(f => !f.error)

}

