
const pSelector = '.ProductListContent'

const phref = '.navigation a'

const url = ['https://www.modalogy.com.tr/']


export { pSelector, phref, url }
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default async function modalogy({ page, enqueueLinks, request, log, addRequests }) {
    debugger
    const title = await page.title();
    log.info(`COLLECT ${title}`, { url: request.loadedUrl });

    await getUrls(page, addRequests)
    const data = await page.$$eval('.ItemOrj', (documents) => {

        return documents.map(document => {
            try {
                return {
                    image: [document.querySelector("img[data-original]").getAttribute('data-original')],
                    title: document.querySelector('.productName.detailUrl a').innerText,
                    price: document.querySelector(".discountPrice span").innerText.replace('₺',''),
                    link: document.querySelector('.productName.detailUrl a').href,
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

    const nextPage = await page.$('li.appliedFilter span')
    const pageUrls = []
    let productCount = 0
    if (nextPage) {
        productCount = await page.evaluate(() => parseInt(document.querySelector('li.appliedFilter span').innerText.replace(/[^\d]/gi, '') ) )
        const totalPages = Math.ceil(productCount / 24)


        let pagesLeft = totalPages
        for (let i = 2; i <= totalPages; i++) {

            pageUrls.push(`${url}?sayfa=` + i)
            --pagesLeft

        }
        await addRequests(pageUrls)
    }

    return pageUrls
}

