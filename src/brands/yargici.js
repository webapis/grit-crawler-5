
const pSelector = '.product-list-container'

const phref = '.sub-menu-column a'

const url = ['https://www.yargici.com/']


export { pSelector, phref, url }


export default async function yargici({ page }) {
    debugger
    const pageTitle = await page.evaluate(()=>Array.from(document.querySelectorAll('.breadcrumb li')).map(m=>m.innerText.replaceAll('\n','').trim() ).join(' '))
    const data = await page.$$eval('[data-enhanced-impressions]', (documents,_pageTitle) => {

        return documents.map(document => {
            const obj = JSON.parse(document.getAttribute('data-enhanced-impressions'))
            return {
                image: [document.querySelector('img').getAttribute('data-src')],
                title: obj.name,
                price: obj.price,
                color:obj.variant,
                link: document.querySelector('a').href,
                pageTitle:_pageTitle,
                currency:'TL'
            }
        })

    },pageTitle)

    debugger
    return data

}
