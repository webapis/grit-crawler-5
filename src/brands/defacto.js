
const pSelector = '.catalog-products'

const phref = 'nav a'

const url = ['https://www.defacto.com.tr/kadin']


export { pSelector, phref, url }


export default async function defacto({ page, enqueueLinks, request, log, addRequests }) {
    debugger
    const title = await page.title();
    log.info(`COLLECT ${title}`, { url: request.loadedUrl });
    const urls = await getUrls(page)
    const mapurls = urls.map(m => { return { url: m } })
    await addRequests(mapurls)
    debugger
    const data = await page.$$eval('.product-card', (documents) => {

        return documents.map(document => {
            return {
                 image: [document.querySelector('.product-card__image--item img').src],
                 title: document.querySelector('.product-card__title--name').innerText,
                 price: document.querySelector('.product-card__price--new').innerText.replaceAll('\n', '').replace('TL', ''),
                 link: document.querySelector('.product-card__title--name').href,
                currency: 'TL'
            }
        })

    })

    return data
}



async function getUrls(page) {
    const url = await page.url()
    const nextPage = await page.$('.catalog__meta--product-count span')
    const pageUrls = []
    let productCount = 0
    if (nextPage) {
        productCount = await page.$eval('.catalog__meta--product-count span', element => parseInt(element.innerHTML))
        const totalPages = Math.ceil(productCount / 60)


        let pagesLeft = totalPages
        for (let i = 2; i <= totalPages; i++) {

            pageUrls.push(`${url}?page=` + i)
            --pagesLeft

        }
    }


    return pageUrls
}

