
const pSelector = '.products'

const phref = '.main_menu a'

const url = ['https://ihandmore.com/']


export { pSelector, phref, url }
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default async function ihandmore({ page, enqueueLinks, request, log, addRequests }) {
    debugger
    const title = await page.title();
    log.info(`COLLECT ${title}`, { url: request.loadedUrl });

    await getUrls(page, addRequests)
    const data = await page.$$eval('.product', (documents) => {

        return documents.map(document => {
            try {
                return {
                    image: [document.querySelector('[srcset]').getAttribute('srcset').split(',')[2].split(' ').filter(f=>f)[0]],
                    title: document.querySelector('h6[itemprop="name"]').innerText,
                    price:document.querySelector('.woocommerce-Price-amount.amount')? Array.from(document.querySelector('.woocommerce-Price-amount.amount').querySelector('bdi').childNodes).reverse()[0].nodeValue:0,
                    link: document.querySelector('.product-category').href,
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

    const nextPage = await page.$('.page-numbers a')
    const pageUrls = []

    if (nextPage) {

        const totalPages = await page.evaluate(() => Math.max(...Array.from(document.querySelectorAll('.page-numbers a')).map(m=>m.innerText).filter(Number)) )


        let pagesLeft = totalPages
        for (let i = 2; i <= totalPages; i++) {

            pageUrls.push(`${url}?page/` + i+'/')
            --pagesLeft

        }
        await addRequests(pageUrls)
    }

    return pageUrls
}

