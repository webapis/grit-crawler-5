import autoScroll from "../utils/autoscroll.js"
const pSelector = '.product-item-list'

const phref = 'nav a'

const url = ['https://www.nocturne.com.tr/']


export { pSelector, phref, url }


export default async function nocturne({ page }) {
    await autoScroll(page, 50)
    debugger
    const data = await page.$$eval('.pitem', (documents) => {

        return documents.map(document => {

            const onePrice = document.querySelector('.oneprice') ? document.querySelector('.oneprice').innerText.replace('TL', '').trim() : null
            const newPrice = document.querySelector('.newprice.red') ? document.querySelector('.newprice.red').innerText.replace('TL', '').trim() : null
            return {
                image: [document.querySelector('[data-original]').getAttribute('data-original')],
                title: document.querySelector('.product-name').innerText,
                price: newPrice?newPrice:onePrice,
                link: document.querySelector('.product-name a').href,
                currency: 'TL'
            }
        })

    })

    debugger
    return data

}



