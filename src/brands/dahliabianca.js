import autoscroller from '../utils/autoscroll.js'
const pSelector = '#ajax-product-grid'

const phref = '.top-menu a'

const url = ['https://www.dahliabianca.com/']


export { pSelector, phref, url }


export default async function dahliabianca({ page }) {
    debugger
    await autoscroller(page,150)
    const data = await page.$$eval('.product-item', (documents) => {

        return documents.map(document => {
            return {
                image: [document.querySelector('.product-item img').getAttribute('data-src')],
                title: document.querySelector('.product-title').innerText,
                price: document.querySelector('.actual-price').innerText.replace('$',''),
                link: document.querySelector('.product-title a').href,
                currency:'USD'
            }
        })

    })

    debugger
    return data

}



