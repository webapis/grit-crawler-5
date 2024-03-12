
const pSelector = '#product-list-container'

const phref = '#navigation a'

const url = ['https://www.tubaergin.com/']


export { pSelector, phref, url }


export default async function adl({ page }) {
    debugger
    const data = await page.$$eval('.showcase', (documents) => {

        return documents.map(document => {
            return {
                image: 'https:'+ document.querySelector('.showcase-image img').getAttribute('data-src'),
                title: document.querySelector('.showcase-title a').innerText,
                price: document.querySelector('.showcase-price-new').innerText.replace('₺',''),
                link: document.querySelector('.showcase-label-container').href,
                currency:'USD'
            }
        })

    })

    debugger
    return data

}



