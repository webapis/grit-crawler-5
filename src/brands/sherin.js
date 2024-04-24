
const pSelector = '.ProductListContent'

const phref = '.newHeaderNav a'

const url = ['https://www.sherin.com.tr/']


export { pSelector, phref, url }


export default async function sherin({ page, addRequests }) {

    await getUrls(page, addRequests)
    debugger
    const data = await page.$$eval('.productItem', (documents) => {

        return documents.map(document => {
            try {
                return {
                    image: [document.querySelector('[data-src]').getAttribute('data-src')],
                    title: document.querySelector('.productName.detailUrl').innerText,
                    price: document.querySelector('.discountPrice').innerText.replace('₺', ''),
                    link: document.querySelector('.productName.detailUrl a').href,
                    currency: 'TL'
                }
            } catch (error) {

                return { error: error.toString(), content: document.innerHTML }
            
            }

        })

    })


    return data

}



async function getUrls(page, addRequests) {
    const url = await page.url()
    debugger;
    await page.waitForSelector('.appliedFilter.FiltrelemeUrunAdet span')
    const productCount = await page.evaluate(() => parseInt(document.querySelector('.appliedFilter.FiltrelemeUrunAdet span').innerText.replace(/[^\d]/gi, '')))
    debugger;
    const totalPages = Math.ceil(productCount / 24)
    const pageUrls = []

    let pagesLeft = totalPages
    for (let i = 2; i <= totalPages; i++) {

        pageUrls.push(`${url}?sayfa=` + i)
        --pagesLeft

    }
    if (pageUrls.length > 0) {

        await addRequests(pageUrls)
    }


}