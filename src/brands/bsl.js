
const pSelector = '.PrdContainer'

const phref = '#SitemapMenu a'

const url = ['https://www.bsl.com.tr/tr/site-haritasi']


export { pSelector, phref, url }
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default async function bsl({ page, enqueueLinks, request, log, addRequests }) {
    debugger
    const title = await page.title();
    log.info(`COLLECT ${title}`, { url: request.loadedUrl });

    await getUrls(page, addRequests)
    const data = await page.$$eval('.Prd', (documents) => {

        return documents.map(document => {
            try {
                return {
                    image: [document.querySelector('.carousel-item [data-srcset]').getAttribute('data-srcset')],
                    title: document.querySelector('.PName').innerText,
                    price: 0,
                    link: document.querySelector('.carousel-item a').href,
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


    const nextPage = await page.$('.TotalProductCount')
    const pageUrls = []
    let productCount = 0
    if (nextPage) {
        productCount = await page.evaluate(() => parseInt(document.querySelector('.TotalProductCount').innerText.replace(/[^\d]/gi, '')))
        const totalPages = Math.ceil(productCount / 24)


        let pagesLeft = totalPages
        for (let i = 2; i <= totalPages; i++) {

            pageUrls.push(`https://www.bsl.com.tr/tr/elbise/?p=${i}&ct=13&g=4`)
            --pagesLeft

        }
        await addRequests(pageUrls)
    }

    return pageUrls
}

