
const pSelector = '.prd-list'

const phref = '.menu a'

const url = ['https://www.twist.com.tr/']


export { pSelector, phref, url }


export default async function twist({ page }) {
    debugger
    const data = await page.$$eval('.prd-inner', (documents) => {

        return documents.map(document => {
            return {
                image:[document.querySelector('[data-image-src]').getAttribute('data-image-src')],// Array.from(document.querySelectorAll('[data-large]')).map(m=>m.getAttribute('data-large')),
                title: document.querySelector('.prd-name').innerText,
                price: document.querySelector('.urunListe_satisFiyat').innerText.replace('₺',''),
                link: document.querySelector('.prd-lnk').href
            }
        })

    })

    debugger
    return data

}



