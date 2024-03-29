import  autoScroll  from "../utils/autoscroll.js"
const pSelector = '#catalogProductsList'
const phref = 'a.vsv-link'
const url = ['https://shop.mango.com/tr/kadin']


export { pSelector, phref, url }


export default async function wcollection({ page }) {

    await autoScroll(page,50)
    debugger
    const data = await page.$$eval('[data-testid="plp.product.figure"]', (documents) => {

        return documents.map(document => {
            return {
                image: [document.querySelector('img').src],
                 title: document.querySelector('.layout-row .md12.text-body-m').innerText,
                price: document.querySelector('[data-testid="currentPrice"] span span').innerText.replace('TL', ''),
                link: document.querySelector('a').href,
                currency:'TL'
            }
        })

    })

    debugger
    return data

}


