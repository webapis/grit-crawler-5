
const pSelector = '#divIcerik'

const phref = '.nav-item-link'

const url = ['https://www.victoriassecret.com.tr/']


export { pSelector, phref, url }


export default async function adl({ page }) {
    debugger
    const data = await page.$$eval('.productItem', (documents) => {

        return documents.map(document => {
            return {
                image:document.querySelector('.detailUrl img').getAttribute('data-src')?[document.querySelector('.detailUrl img').getAttribute('data-src')]:[document.querySelector('.detailUrl img').src],
                title: document.querySelector('.productName.detailUrl a').innerText,
                price: document.querySelector('.discountPrice').innerText.replace('TL',''),
                link: document.querySelector('.productName.detailUrl a').href
            }
        })

    })

    debugger
    return data

}