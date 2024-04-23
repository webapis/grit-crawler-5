import autoScroll from "../utils/autoscroll.js"
const pSelector = '#category-list'

const phref = '#mainMenu a'

const url = ['https://www.fever.com.tr/']


export { pSelector, phref, url }


export default async function fever({ page }) {
    await autoScroll(page, 50)
    debugger
    const data = await page.$$eval('.productItem', (documents) => {

        return documents.map(document => {


            return {
                image: [document.querySelector('span[itemprop="image"]').getAttribute('content')],
                title: document.querySelector('.p-bottom a').innerText,
                price: document.querySelector('.currentPrice').innerText.replace('₺','').trim(),
                link: document.querySelector('.p-bottom a').href,
                currency: 'TL'
            }
        })

    })

    debugger
    return data

}



