
const pSelector = '#MainContent'

const phref = '.header__inline-menu a'

const url = ['https://arzukaprol.com/']


export { pSelector, phref, url }
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default async function arzukaprol({ page, enqueueLinks, request, log, addRequests }) {
    debugger
    const title = await page.title();
    log.info(`COLLECT ${title}`, { url: request.loadedUrl });

    await getUrls(page, addRequests)
    const data = await page.$$eval('.grid__item', (documents) => {
        const priceLast = document.querySelector('.price-item--last span') ? document.querySelector('.price-item--last span').innerText.replace('TL', '') : null
        const priceRegular = document.querySelector('.price-item.price-item--regular span') ? document.querySelector('.price-item.price-item--regular span').innerText.replace('TL', '') : null
        return documents.map(document => {
            try {
                return {
                    image: ['https:' + document.querySelector('.media [srcset]').getAttribute('srcset').split(',')[2].split(' ').filter(f => f)[0]],
                    title: document.querySelector('[id^="CardLink-"]').innerText,
                    price: priceLast ? priceLast : priceRegular,
                    link: document.querySelector('[id^="CardLink-"]').href,
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

    const nextPage = await page.$('.pagination')
    const pageUrls = []

    if (nextPage) {

        const totalPages = await page.evaluate(() => Math.max(...Array.from(document.querySelectorAll('.pagination a')).map(m => m.innerText).filter(Number)))


        let pagesLeft = totalPages
        for (let i = 2; i <= totalPages; i++) {

            pageUrls.push(`${url}?page=` + i)
            --pagesLeft

        }
        await addRequests(pageUrls)
    }

    return pageUrls
}

