import autoScroll from "../utils/autoscroll.js"
const pSelector = '.productItem'

const phref = '.navigation a'

const url = ['https://rivus.com.tr/']


export { pSelector, phref, url }


export default async function rivus({ page }) {
    await autoScroll(page, 50)
    debugger
    const data = await page.$$eval('.productItem', (documents) => {

        return documents.map(document => {
        
            try {
                return {
                    image: [document.querySelector('[data-src]').getAttribute('data-src')],
                    title: document.querySelector('.productName.detailUrl').innerText,
                    price: document.querySelector('.discountPrice').innerText.replace('₺',''),
                    link: document.querySelector('.productName.detailUrl a').href,
                    currency: 'TL'
                }
            } catch (error) {
                return { error: error.toString(), content: document.innerHTML }
            }

        })

    })

    debugger
    return data

}

