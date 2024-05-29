import autoScroll from "../utils/autoscroll.js"
const pSelector = '.product-list'

const phref = ''

const url = ['https://en.love-onfriday.com/collections/all']


export { pSelector, phref, url }
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default async function loveOnfriday({ page, enqueueLinks, request, log, addRequests }) {

    debugger
    const title = await page.title();
    log.info(`COLLECT ${title}`, { url: request.loadedUrl });

    await getUrls(page, addRequests)
    await autoScroll(page, 50)
    const data = await page.$$eval('.product-block', (documents) => {

        return documents.map(document => {
            try {
                return {
                    image: ['https:' + document.querySelector(".rimage__image").getAttribute("srcset").split(",")[5].split(' ').filter(f => f)[0]],
                    title: document.querySelector('.product-block__title').innerText,
                    price: document.querySelector('.product-price__item').innerText.replace('$', '').replace("USD", ""),
                    link: document.querySelector('.product-link').href,
                    currency: 'USD'
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

            const updatedUrl = updateUrlPage(url, i)
            pageUrls.push(updatedUrl)
            --pagesLeft

        }
        await addRequests(pageUrls)
    }

    return pageUrls
}

function updateUrlPage(url, newPage) {
    try {
        // Attempt using URLSearchParams (recommended)
        const newUrl = new URL(url);
        newUrl.searchParams.set('page', newPage);
        return newUrl.toString();
    } catch (error) {
        // Fallback to string manipulation if URLSearchParams fails
        const baseUrl = url.split('?')[0];
        const queryParams = new URLSearchParams(url.split('?')[1]);
        queryParams.set('page', newPage);
        return baseUrl + '?' + queryParams.toString();
    }
}