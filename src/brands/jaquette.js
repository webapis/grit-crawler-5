
const pSelector = '.product-grid'

const phref = '#main-navigation-wrapper a'

const url = ['https://jaquette.com.tr/']


export { pSelector, phref, url }
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default async function jaquette({ page, enqueueLinks, request, log, addRequests }) {
    debugger
    const title = await page.title();
    log.info(`COLLECT ${title}`, { url: request.loadedUrl });

    await getUrls(page, addRequests)
    const data = await page.$$eval('.grid__item', (documents) => {
   
        return documents.map(document => {
            try {
                return {
                    image: [document.querySelector('.p-image img').src],
                    title:     document.querySelector('.hp-title .indiv-product-title-text').innerText,
                    price: document.querySelector('span.money')? document.querySelector('span.money').innerText.replace("TL",""):0,
                    link: document.querySelector('.hp-title a').href,
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

    const nextPage = await page.$('.pagination-text div')
    const pageUrls = []

    if (nextPage) {
    
        const totalPages = await page.evaluate(() =>  Math.max(...document.querySelector('.pagination-text div').innerText.split(' ').filter(Number)) )


        let pagesLeft = totalPages
        for (let i = 2; i <= totalPages; i++) {

            pageUrls.push(`${url}?page=` + i)
            --pagesLeft

        }
        await addRequests(pageUrls)
    }

    return pageUrls
}

