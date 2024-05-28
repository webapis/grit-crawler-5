
const pSelector = '.product-grid'

const phref = '.header__menu a'

const url = ['https://farawayclothing.com/']


export { pSelector, phref, url }
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default async function farawayclothing({ page, enqueueLinks, request, log, addRequests }) {
    debugger
    const title = await page.title();
    log.info(`COLLECT ${title}`, { url: request.loadedUrl });

    await getUrls(page, addRequests)
    const data = await page.$$eval('.product-item', (documents) => {

        return documents.map(document => {
            try {
                return {
                    image: ['https:'+document.querySelector('[data-bgset]').getAttribute('data-bgset').split(',')[2].split(' ').filter(f=>f)[0]],
                    title: document.querySelector('.product__grid__title span').innerText,
                    price: document.querySelector('.new-price').innerText.replace('TL',''),
                    link: document.querySelector('.product-link').href,
                    currency: 'TL'
                }
            } catch (error) {
                return { error: error.toString(), content: document.innerHTML }
            }

        })

    })

    debugger
    return data.filter((f)=>!f.error)

}

async function getUrls(page, addRequests) {
    const url = await page.url()

    const nextPage = await page.$('.pagination')
    const pageUrls = []

    if (nextPage) {
    
        const totalPages = await page.evaluate(() =>  Math.max(...Array.from(document.querySelectorAll('.pagination-custom a')).map(m=>m.innerText).filter(Number)) )


        let pagesLeft = totalPages
        for (let i = 2; i <= totalPages; i++) {

            pageUrls.push(`${url}?page=` + i)
            --pagesLeft

        }
        await addRequests(pageUrls)
    }

    return pageUrls
}

