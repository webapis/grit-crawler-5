import autoScroll from "../utils/autoscroll.js"
const pSelector = '.product-grid'

const phref = '#main-menu a'

const url = ['https://berr-in.com/']


export { pSelector, phref, url }


export default async function berrin({ page }) {
    await autoScroll(page, 50)
    debugger
    const data = await page.$$eval('.product-layout', (documents) => {

        return documents.map(document => {
            const priceNormal = document.querySelector('.price-normal') ? document.querySelector('.price-normal').innerText.replace('TL', '').trim() : null
            const priceNew = document.querySelector('.price-new') ? document.querySelector('.price-new').innerText.replace('TL', '').trim() : null
            try {
                return {
                    image: [document.querySelector('[data-srcset]').getAttribute('data-srcset').split(',')[0].split(' ').filter(f => f)[0]],
                    title: document.querySelector('div.name').innerText,
                    price: priceNormal ? priceNormal : priceNew,
                    link: document.querySelector('.image a').href,
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

