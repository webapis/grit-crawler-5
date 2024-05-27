
const pSelector = 'product-list'

const phref = 'nav a'

const url = ['https://biancoenero.com.tr/']


export { pSelector, phref, url }
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default async function biancoenero({ page, enqueueLinks, request, log, addRequests }) {
    debugger
    const title = await page.title();
    log.info(`COLLECT ${title}`, { url: request.loadedUrl });

    await getUrls(page, addRequests)
    const data = await page.$$eval('product-card', (documents) => {

        return documents.map(document => {
            try {
                return {
                    image: ['https:'+document.querySelector('[srcset]').getAttribute('srcset').split(',')[1].split(' ').filter(f=>f)[0]],
                    title: document.querySelector('.product-title').innerHTML,
                    price: Array.from(document.querySelector('sale-price').childNodes).reverse()[0].nodeValue.replace('TL','').replaceAll('\n','').trim(),
                    link: document.querySelector('.product-title').href,
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
    
        const totalPages = await page.evaluate(() =>  Math.max(...Array.from(document.querySelectorAll('.pagination a')).map(m=>m.innerHTML).filter(Number)) )


        let pagesLeft = totalPages
        for (let i = 2; i <= totalPages; i++) {

            pageUrls.push(`${url}?page=` + i)
            --pagesLeft

        }
        await addRequests(pageUrls)
    }

    return pageUrls
}

