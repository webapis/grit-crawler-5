
const pSelector = '.product-list-container'

const phref = '.navigation-list a'

const url = ['https://www.wheneverco.com/']


export { pSelector, phref, url }


export default async function wheneverco({ page }) {
    debugger
    const data = await page.$$eval('.product-list-item', (documents) => {

        return documents.map(document => {
            return {
                image: ['https:'+document.querySelector('.product-image img').getAttribute('data-lazysrc')],
                title: document.querySelector('.product-name').innerText,
                price: document.querySelector('.price').innerText,
                link: document.querySelector('.product-image a').href
            }
        })

    })

    debugger
    return data

}
