
const pSelector = '.product-list-container'

const phref = '.sub-menu-column a'

const url = ['https://www.yargici.com/']


export { pSelector, phref, url }


export default async function yargici({ page }) {
    debugger
    const data = await page.$$eval('[data-enhanced-impressions]', (documents) => {

        return documents.map(document => {
            const obj = JSON.parse(document.getAttribute('data-enhanced-impressions'))
            return {
                image: [document.querySelector('img').getAttribute('data-src')],
                title: obj.name,
                price: obj.price,
                color:obj.variant,
                link: document.querySelector('a').href,
                currency:'TL'
            }
        })

    })

    debugger
    return data

}
