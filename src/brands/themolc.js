
const pSelector = '#product-list-container'

const phref = '#navigation a'

const url = ['https://www.themolc.com/']


export { pSelector, phref, url }


export default async function themolc({ page, enqueueLinks, request, log }) {
    debugger
    const title = await page.title();
    log.info(`COLLECT ${title}`, request.loadedUrl);
    await enqueueLinks({
        selector: '.paginate a',
        label: 'list',
    });
    debugger
    const data = await page.$$eval('.showcase', (documents) => {

        return documents.map(document => {
            return {
                image: ['https:' + document.querySelector('[data-src]').getAttribute('data-src')],
                title: document.querySelector('.showcase-title').innerText,
                price: document.querySelector('.showcase-price-new').innerText.replace('TL','').trim(),
                link: document.querySelector('.showcase-title a').href,
                currency: 'TL'
            }
        })

    })

    debugger
    return data

}



