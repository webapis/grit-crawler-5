
const pSelector = '.product-list'

const phref = '.tmenu_nav a'

const url = ['https://en.love-onfriday.com/']


export { pSelector, phref, url }
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default async function loveOnfriday({ page, enqueueLinks, request, log, addRequests }) {
    debugger
    const title = await page.title();
    log.info(`COLLECT ${title}`, { url: request.loadedUrl });
    const links = await page.$$('a[href="javascript:;"]');
    for (let link of links) {

        await link.click();
        await enqueueLinks({
            selector: 'a.tmenu_item_link',
            label: 'list',
        });
        // Wait for a short time to allow the sub-links to appear, adjust this timing as needed
        await delay(3000)// Adjust the time as per your requirements
    }
    await getUrls(page, addRequests)
    const data = await page.$$eval('.product-block', (documents) => {
  
        return documents.map(document => {
            try {
                return {
                    image: [document.querySelector(".rimage__image").getAttribute("srcset").split(",")[5].split(' ').filter(f=>f)[0]],
                    title: document.querySelector('.product-block__title').innerText,
                    price: document.querySelector('.product-price__item').innerText.replace('₺',''),
                    link: document.querySelector('.product-link').href,
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

        const totalPages = await page.evaluate(() => Math.max(...Array.from(document.querySelectorAll('.pagination a')).map(m=>m.innerText).filter(Number)) )


        let pagesLeft = totalPages
        for (let i = 2; i <= totalPages; i++) {

            pageUrls.push(`${url}?page=` + i)
            --pagesLeft

        }
        await addRequests(pageUrls)
    }

    return pageUrls
}

