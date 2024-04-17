
const pSelector = '.prd-list'

const phref = '[data-blog-category="main menu"] a'

const url = ['https://www.ipekyol.com.tr/']


export { pSelector, phref, url }

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default async function ipekyol({ page, addRequests, request }) {

    // await page.waitForSelector('.open-menu')
    // await page.click('.open-menu')
    // await delay(500)
    // const links = await page.$$('.ems-sub-menu.sub-items');
    // debugger
    // if (request.loadedUrl === 'https://www.ipekyol.com.tr/giyim-modelleri') {
    //     for (let link of links) {

    //         await link.hover();
    //         await enqueueLinks({
    //             selector: '[data-blog-category="main menu"] a',
    //             label: 'list',
    //         });
    //         // Wait for a short time to allow the sub-links to appear, adjust this timing as needed
    //         await delay(3000)// Adjust the time as per your requirements
    //     }


    // }

    await getUrls(page, addRequests)

    debugger
    const data = await page.$$eval('.product-item', (documents) => {

        return documents.map(document => {
            try {
                return {
                    image: [document.querySelector('[data-image-src]').getAttribute('data-image-src')],
                    title: document.querySelector('.name').innerText,
                    price: document.querySelector('.salesprice').innerText.replace('₺', '').trim(),
                    link: document.querySelector('.prd-lnk').href,
                    currency: 'TL'
                }
            } catch (error) {
                return { error: error.toString(),content:document.innerHTML }
            }

        })

    })



    return data

}



async function getUrls(page, addRequests) {
    const url = await page.url()
    debugger;
    await page.waitForSelector('.prd-qty')
    const productCount = await page.evaluate(() => parseInt(document.querySelector('.prd-qty').innerText.replace(/[^\d]/gi, '')))
    debugger;
    const totalPages = Math.ceil(productCount / 36)
    const pageUrls = []

    let pagesLeft = totalPages
    for (let i = 2; i <= totalPages; i++) {

        pageUrls.push(`${url}?page=` + i)
        --pagesLeft

    }
    if (pageUrls.length > 0) {
        await addRequests(pageUrls)
    }


}