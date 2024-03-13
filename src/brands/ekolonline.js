
const pSelector = '.productList'

const phref = '.menuListe a'

const url = ['https://www.ekolonline.com/']


export { pSelector, phref, url }


export default async function adl({ page }) {
    debugger
    const data = await page.$$eval('.product-list-item', (documents) => {

        return documents.map(document => {
            return {
                image: [document.querySelector('[data-img]').getAttribute('data-img')],
                title: document.querySelector('.mainTitle').innerText,
                price:document.querySelector('.mainFiyat2')? document.querySelector('.mainFiyat2').innerText.replace('TL',''):document.querySelector('.mainFiyat span').innerText.replace('TL',''),
                link: document.querySelector('a').href,
                currency:'TL'
            }
        })

    })

    debugger
    return data.filter(f=>f.price)

}



