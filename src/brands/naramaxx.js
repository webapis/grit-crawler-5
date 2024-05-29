
const pSelector = '.category-product'

const phref = '.navbar-nav a'

const url = ['https://www.naramaxx.com/']


export { pSelector, phref, url }
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default async function naramaxx({ page, enqueueLinks, request, log, addRequests }) {
    debugger
    const title = await page.title();
    log.info(`COLLECT ${title}`, { url: request.loadedUrl });

    await getUrls(page, addRequests)
    const data = await page.$$eval('.product', (documents) => {

        return documents.map(document => {
            try {
                return {
                    image: [document.querySelector('.image-hover .img-responsive').src],
                    title: document.querySelector('.product-name').innerText,
                    price: document.querySelector('.price-sales').innerText.replace('TL','').trim(),
                    link: document.querySelector('.image-hover a').href,
                    currency: 'TL'
                }
            } catch (error) {
                return { error: error.toString(), content: document.innerHTML }
            }

        })

    })

    debugger
    return data.filter((f) => !f.error)

}

async function getUrls(page, addRequests) {
    const url = await page.url()

    const nextPage = await page.$('#paginationinfo')
    const pageUrls = []

    if (nextPage) {

        const totalPages = await page.evaluate(() => Math.ceil(parseInt( document.querySelector('#paginationinfo').innerText.split(' ')[0])/60) )


        let pagesLeft = totalPages
        for (let i = 2; i <= totalPages; i++) {

            pageUrls.push(`${url}?rpg=` + i)
            --pagesLeft

        }
        await addRequests(pageUrls)
    }

    return pageUrls
}

