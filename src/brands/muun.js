import autoScroll from "../utils/autoscroll.js"
const pSelector = '.ProductListContent'

const phref = '.navigation a'

const url = ['https://www.muun.com.tr/']


export { pSelector, phref, url }


export default async function muun({ page }) {
    await autoScroll(page, 50)
    debugger
    const data = await page.$$eval('.productItem', (documents) => {

        return documents.map(document => {


            return {
                image: document.querySelector('[data-original]') ? [document.querySelector('[data-original]').getAttribute('data-original')] : [],
                title: document.querySelector('.productName').innerText,
                price: document.querySelector('.discountPrice').innerText.replace('$', '').replace('TL',''),
                link: document.querySelector('.productName a').href,
                currency: 'USD'
            }
        })

    })

    debugger
    return data.filter(f => f.image.length > 0)

}



