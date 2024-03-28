import autoScroll from "../utils/autoscroll.js"
const pSelector = '.category__list__main'

const phref = '.nav-links a'

const url = ['https://dressweden.com/tasarim-kadin-giyim-modelleri']


export { pSelector, phref, url }


export default async function dressweden({ page }) {
    await autoScroll(page,100)
    debugger
    const data = await page.$$eval('[data-id]', (documents) => {

        return documents.map(document => {
            return {
                image: [document.querySelector('.category-products-image').getAttribute('srcset').split(',')[10].trim().split(' ')[0]],
                title: document.querySelector('h2.product-name').innerText,
                price: Array.from(document.querySelector('.discount-price').querySelectorAll('span')).reverse()[0].innerText.replace('₺','').trim(),
                link: document.querySelector('a').href,
                currency:'TL'
            }
        })

    })

    debugger
    return data

}



